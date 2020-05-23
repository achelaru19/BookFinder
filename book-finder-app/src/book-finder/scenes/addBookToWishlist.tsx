import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import {addBookToWishList} from '../actions/firebaseDB';
import { AppLoading } from 'expo';
import AwesomeAlert from 'react-native-awesome-alerts';
import NavBar from "../components/navBar";
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';
import { isWishListBookValid } from '../utils/inputFormatChecks';
import { styles } from '../styles/addBookToWishlistStyle';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';



export default function AddBookToWishList () {
    const [fontLoaded, setLoadedFont] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [editor, setEditor] = useState<string>('');
    const [isbn, setISBN] = useState<string>('');
    const [bookAdded, setBookAdded] = useState<boolean>(false);
    const [buttonDisabled, disableButton] = useState<boolean>(true);
    //@ts-ignore
    const [user, setUser] = useContext(UserContext);

    const navigation = useNavigation();
    const addBook = navigation.getParam('addBook');
    const addBookFunction = (email, title, author, isbn, editor) => {
        addBookToWishList(email, title, author, isbn, editor);
        addBook();
        setTitle('');
        setAuthor('');
        setEditor('');
        setISBN('');
        setBookAdded(true);
    }

    useEffect(() => {
        const notAllCorrect = isWishListBookValid(title, author, editor, isbn);
        disableButton(!notAllCorrect);
    }, [title, author, editor, isbn])

    if(!fontLoaded)
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadedFont)} 
            />
        );
    else {
        return (
            <View style={{flex: 1}}>
                <NavBar title="Lista Desideri"/>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Aggiungi un libro nella tua Lista Desideri per ricevere una notifica appena qualcuno lo aggiunge</Text>
                </View>
                <KeyboardAvoidingView style={styles.container}>
                    <SafeAreaView>
                        <ScrollView>
                            
                    <View>
                        <Text style={styles.label}>Titolo</Text>
                            <TextInput
                                onChangeText={text => setTitle(text)}
                                value={title}
                                style={styles.inputBox}
                            />
                    </View>
                    <View>
                        <Text style={styles.label}>Autore</Text>
                            <TextInput
                                onChangeText={text => setAuthor(text)}
                                value={author}
                                style={styles.inputBox}
                            />
                    </View>
                    <View>
                        <Text style={styles.label}>Editore</Text>
                            <TextInput
                                onChangeText={text => setEditor(text)}
                                value={editor}
                                style={styles.inputBox}
                            />
                    </View>
                    <View>
                        <Text style={styles.label}>ISBN</Text>
                            <TextInput
                                onChangeText={text => setISBN(text)}
                                value={isbn}
                                keyboardType={'numeric'}
                                style={styles.inputBox}
                            />
                    </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity disabled={buttonDisabled} onPress={() => addBookFunction(user.email, title, author, isbn, editor)}>
                        <Text style={styles.buttonText}>Aggiungi Libro</Text>
                    </TouchableOpacity>
                </View>
                        </ScrollView>
                    </SafeAreaView>
                </KeyboardAvoidingView>
                <AwesomeAlert
                    show={bookAdded}
                    showProgress={false}
                    title="Libro aggiunto alla Wish List"
                    message="Riceverai una notifica non appena qualcuno della tua universit&agrave; aggiunger&agrave; questo libro"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonColor="#90001F"
                    onConfirmPressed={() => {
                        setBookAdded(false);
                        navigation.navigate("WishList");
                    }}
                />
            </View>
        );
    }
  }
  
  AddBookToWishList.navigationOptions = ({ navigation }) => ({
    drawerLabel: () => null
  })


  