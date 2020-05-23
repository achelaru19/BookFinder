import React, { useEffect, useState, useContext } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import { AppLoading } from 'expo';
import NavBar from "../components/navBar";
import {getSellingBooks, removeBook} from '../actions/firebaseDB';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { UserContext } from '../consts/context';
import { styles } from '../styles/myBooksStyle';
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

