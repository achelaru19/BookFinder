import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import NavBar from '../components/navBar';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';
import BookInformation from '../components/bookInformation';

export default function Result() {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [books, setBooks] = useState(null); 

    useEffect(() => {
        // get books with props

        let book = [
            {title: 'Titolo1', author: 'Autore 1', editor: 'Editore 1'}, 
            {title: 'Titolo2', author: 'Autore 2', editor: 'Editore 2'}, 
            {title: 'Titolo3', author: 'Autore 1', editor: 'Editore 1'}, 
            {title: 'Titolo4', author: 'Autore 2', editor: 'Editore 2'}
        ];
        setBooks(book);

    }, []);

    if(!fontLoaded)
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