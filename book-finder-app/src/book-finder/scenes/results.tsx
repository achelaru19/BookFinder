import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
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
    const [booksSet, booksHaveBeenSet] = useState<boolean>(false);
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
                        <Text>NESSUN LIBRO TROVATO RICERCA</Text>
                        
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
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  