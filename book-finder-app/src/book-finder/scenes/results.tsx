import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import NavBar from '../components/navBar';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';
import BookInformation from '../components/bookInformation';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';
import { searchBook } from '../actions/firebaseDB';

export default function Result(props) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [books, setBooks] = useState(null); 
    const [booksSet, booksHaveBeenSet] = useState(false);
    //@ts-ignore
    const [user] = useContext(UserContext);
    
    const navigation = useNavigation();
    const parameters = navigation.getParam("parameters");


    useEffect(() => {
        console.log("RESULT PAGE")
        console.log(parameters);
        console.log(user);
        searchBook(user, parameters.title, parameters.author, parameters.editor, parameters.isbn, books => setBooks(books))
        

    }, [parameters]);

    useEffect(() =>{
        console.log(books)
    }, [books])

    if(!fontLoaded || books === null)
        return (
        <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setFontLoaded)} 
        />
        );
    else 
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
    
}

Result.navigationOptions = ({ navigation }) => ({
    title: 'Result',
    drawerLabel: () => null
});