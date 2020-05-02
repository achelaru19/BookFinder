import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import { AppLoading } from 'expo';
import NavBar from "../components/navBar";
import {getSellingBooks, removeBook} from '../actions/firebaseDB';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { UserContext } from '../consts/context';
import { BookType } from '../types/bookType';
import { UserType } from '../types/userType';
import { useNavigation } from 'react-navigation-hooks';
import { ScrollView } from 'react-native-gesture-handler';


export default function MyBooks() {

    const [fontLoaded, setLoadedFont] = useState<boolean>(false);
    const [myBooks, setMyBooks] = useState<BookType[] | null>(null);
    //@ts-ignore
    const [user] = useContext<UserType>(UserContext);

    const {navigate} = useNavigation();

    useEffect(() => {
        getSellingBooks(user.email, (books) => setMyBooks(books));
    }, []);

    const removeBookFromList = (title, author, editor, isbn) => {
        removeBook(user.email, title, author, editor, isbn);
        const newBooks = myBooks.filter(val => !(val.title == title && val.author == author && val.editor == editor && val.isbn == isbn));
        setMyBooks(newBooks);
      };

    if (!fontLoaded)
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadedFont)}
            />
        );
    else {
        if(myBooks === null) {
            return (
                <View style={{flex: 1}}>
                    <NavBar title="I Miei Libri"/>
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#90001F" />
                    </View>
                </View>
                );
        } else{
            if(myBooks.length === 0) {
                return(
                    <View style={{flex: 1}}>
                        <NavBar title="I Miei Libri"/>
                        <View style={styles.container}>
                        <Image style={styles.imageHolder} source={require('../assets/images/wish-book.png')} />
                        <Text style={styles.textHolder}>Non hai aggiunto nessun libro da vendere</Text>
                        <View style={styles.addButton}>
                            <View style={{flexDirection: 'column', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => navigate('AddBook')}>
                                <Text style={styles.buttonLabel}>Aggiungi libro</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </View>
                );
            }
            else{
                return (
                    <View style={{ flex: 12 }}>
                        <NavBar title="I Miei Libri" />
                        <View style={{ flex: 11 }}>
                            <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
                                <ScrollView>
                                    <View>
                                        <SwipeableFlatList
                                            data={myBooks}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }, index) => (
                                                <View style={styles.bookContainer} key={'myBook_' + index}>
                                                    <Text style={styles.label}>{item.title}</Text>
                                                    <Text style={styles.label}>{item.author}</Text>
                                                    <Text style={styles.label}>{item.editor}</Text>
                                                </View>
                                            )}
                                            renderRight={({ item }, index) => (
                                                <View style={styles.deleteButton} key={'delete_' + index}>
                                                    <Icon name="delete" size={30} onPress={() => removeBookFromList(item.title, item.author, item.editor, item.isbn)} />
                                                </View>
                                            )}
                                            backgroundColor={'white'}
                                        />
                                    </View>
                                </ScrollView>
                            </SafeAreaView >
                        </View>
                    </View>
                );
            }
        }
    }
};

MyBooks.navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
        <Icon name="book" style={{ fontSize: 24, color: tintColor }} />
    )
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageHolder: {
      width: 200,
      height: 150
    },
    textHolder: {
      fontSize: 20,
      fontFamily: 'Cardo-Regular',
      marginTop: 17
    },
    addButton: {
        backgroundColor: '#90001F',
        height: 50,
        width: 180,
        alignContent: 'space-around',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        marginTop: 17
      },
      buttonLabel: {
        fontFamily: 'Cardo-Regular',
        fontSize: 20,
        color: 'white',
      },
    bookContainer: {
        flex: 3,
        height: 100,
        flexDirection: "column",
        alignContent: 'space-around',
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },
    label: {
        flex: 1,
        fontFamily: "Cardo-Regular",
        fontSize: 18,
        paddingLeft: 9
    },
    deleteButton: {
        height: 100,
        width: 70,
        backgroundColor: '#CC0000',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
});