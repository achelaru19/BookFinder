import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import {addBookToWishList} from '../actions/firebaseDB';
import { AppLoading } from 'expo';
import NavBar from "../components/navBar";
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { useNavigation } from 'react-navigation-hooks';



export default function AddBookToWishList () {
    const [fontLoaded, setLoadedFont] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [editor, setEditor] = useState('');
    const [isbn, setISBN] = useState('');
    const email = "angel.chelaru@gmail.com";

    const navigation = useNavigation();
    const addBook = navigation.getParam('addBook');
    const addBookFunction = (email, title, author, isbn, editor) => {
        addBookToWishList(email, title, author, isbn, editor);
        const newBook = {
            'title': title,
            'author': author,
            'editor': editor,
            'isbn': isbn,
            'email': email
        }
        addBook(newBook);
        navigation.navigate("WishList");
    }

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
                <View style={styles.container}>
                    <View>
                        <Text style={styles.label}>Titolo</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                onChangeText={text => setTitle(text)}
                                value={title}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Autore</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                onChangeText={text => setAuthor(text)}
                                value={author}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Editore</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                onChangeText={text => setEditor(text)}
                                value={editor}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>ISBN</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                onChangeText={text => setISBN(text)}
                                value={isbn}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity onPress={() => addBookFunction(email, title, author, isbn, editor)}>
                        <Text style={styles.buttonText}>Aggiungi Libro</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  }
  
  AddBookToWishList.navigationOptions = ({ navigation }) => ({
    drawerLabel: () => null
  })


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    heading: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center'
    },
    headingText: {
        fontSize: 18,
        fontFamily: "Cardo-Regular",
    },
    inputBox: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 30,
        marginHorizontal: 5,
        height: 30,
        paddingLeft: 10
    },
    label: {
        fontSize: 20,
        fontFamily: "Cardo-Regular",
        marginLeft: 12,
        marginTop: 5
    },
    buttonBox: {
        backgroundColor: '#90001F',
        marginHorizontal: 10,
        marginBottom: 10,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonText: {
        fontFamily: 'Cardo-Regular',
        color: 'white',
        fontSize: 20
    }
  });
  