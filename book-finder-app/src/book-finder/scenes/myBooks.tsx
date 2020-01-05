import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';
import NavBar from "../components/navBar";
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { useNavigation } from 'react-navigation-hooks';
import MyBook from '../components/myBook';
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';

export default function MyBooks () {

    const [fontLoaded, setLoadedFont] = useState(false);
    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
        let books = [{
                title: 'Programmazione Java',
                author: 'John Green',
                editor: 'Mondadori'
            }, 
            {
                title: 'Soft Computing',
                author: 'Samuel Becket',
                editor: 'Rizzoldi'
            }, 
            {
                title: 'Fisica Generali',
                author: 'Mazzoldi',
                editor: 'Pinguin Editor'
            }, 
            {
                title: 'Fondamenti di Crittografia',
                author: 'Giovanni Stea',
                editor: 'Morzanti'
            }, 
            {
                title: 'Elettrotecnica',
                author: 'Antonio Musolino',
                editor: 'Pisa University Press'
            }, 
            {
                title: 'Chimica General',
                author: 'Heisenberg',
                editor: 'Arizona University Press'
            }, 
            {
                title: 'Chimica Generale',
                author: 'Heisenberg',
                editor: 'Arizona University Press'
            }
        ];
        setMyBooks(books);
    }, []);

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
            <View style={{flex:12}}>
                <NavBar title="I Miei Libri" />
                <View style={{flex:11}}>
                    <SafeAreaView  style={{flex:1, flexDirection: 'column'}}>
                        <View>
                            <SwipeableFlatList
                                data={myBooks}
                                key={Math.random()*1000000}
                                renderItem={({ item }, index) => (
                                    <View style={styles.bookContainer} key={'myBook_' + index}>
                                        <Text style={styles.label}>{item.title}</Text>
                                        <Text style={styles.label}>{item.author}</Text>
                                        <Text style={styles.label}>{item.editor}</Text>
                                    </View>
                                )}
                                renderRight={({ item }, index) => (
                                    <View style={styles.deleteButton} key={'delete_' + index}>
                                        <Icon name="delete" size={30} onPress={() => console.log("cancella libro")} />
                                    </View>
                                )}
                                backgroundColor={'white'}
                            />
                        </View>
                    </SafeAreaView >
                </View>
            </View>
        );
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
    }
});