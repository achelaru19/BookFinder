import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import NavBar from '../components/navBar';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';
import BookInformation from '../components/bookInformation';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';
import { searchBook } from '../actions/firebaseDB';
import { BookType } from '../types/bookType';
import { UserType } from '../types/userType';

export default function Result(props) {

    const [fontLoaded, setFontLoaded] = useState<boolean>(false);
    const [books, setBooks] = useState<BookType[] | null>(null); 
    //@ts-ignore
    const [user] = useContext<UserType>(UserContext);
    
    const navigation = useNavigation();
    const parameters = navigation.getParam("parameters");

    useEffect(() => {
        searchBook(user, parameters.title, parameters.author, parameters.editor, parameters.isbn, books => setBooks(books));
    }, [parameters]);

    useEffect(() =>{
        console.log(books)
    }, [books])

    if(!fontLoaded || books === null){
        if(!fontLoaded) 
            return (
                <AppLoading
                    startAsync={loadResourcesAsync}
                    onError={handleLoadingError}
                    onFinish={() => handleFinishLoading(setFontLoaded)} 
                />);
        else 
            return (
                <View style={{flex: 1}}>
                    <NavBar title="Ricerca"/>
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#90001F" />
                    </View>
                </View>
                );
    }
    else {
        if(books.length > 0)
            return (
                <View style={{flex: 1}}>
                    <NavBar title="Ricerca"/>
                    <View style={{flex: 12}}>
                        <ScrollView style={{flex: 11}}>
                            {books.map((book, index) => <BookInformation book={book} key={'book-info-'+index}/>)}
                        </ScrollView>
                        
                    </View>
                </View>
            );
        else
            return (
                <View style={{flex: 1}}>
                    <NavBar title="Ricerca"/>
                    <View style={{flex: 12}}>
                        <View style={styles.containerNoBookFound}>
                            <Image style={styles.imageHolder} source={require('../assets/images/book_not_found.png')} />
                            <Text style={styles.textHolder}>Nessun libro trovato</Text>
                            <View style={styles.addButton}>
                                <View style={{flexDirection: 'column', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                                    <Text style={styles.buttonLabel}>Cerca un altro libro</Text>
                                </TouchableOpacity>
                        </View>
                  </View>
                </View>
                        
                    </View>
                </View>
            );
    }
    
}

Result.navigationOptions = ({ navigation }) => ({
    title: 'Result',
    drawerLabel: () => null
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    containerNoBookFound: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
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
    buttonLabel: {
      fontFamily: 'Cardo-Regular',
      fontSize: 20,
      color: 'white',
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
  });
  