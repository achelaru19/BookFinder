import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import { AppLoading } from 'expo';
import NavBar from "../components/navBar";
import {getSellingBooks} from '../actions/firebaseDB';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { UserContext } from '../consts/context';
import { BookType } from '../types/bookType';
import { UserType } from '../types/userType';


export default function MyBooks() {

    const [fontLoaded, setLoadedFont] = useState<boolean>(false);
    const [myBooks, setMyBooks] = useState<BookType[]>([]);
    //@ts-ignore
    const [user] = useContext<UserType>(UserContext);

    useEffect(() => {
        getSellingBooks(user.email, (books) => setMyBooks(books));
    }, []);

    if (!fontLoaded)
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadedFont)}
            />
        );
    else {
        return (
            <View style={{ flex: 12 }}>
                <NavBar title="I Miei Libri" />
                <View style={{ flex: 11 }}>
                    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
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