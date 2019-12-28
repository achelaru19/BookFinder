import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';
import NavBar from "../components/navBar";
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';


export default function AddBookToWishList () {
    const [fontLoaded, setLoadedFont] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [editor, setEditor] = useState('');
    const [isbn, setISBN] = useState('');
    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');
    const [booksInWishList, setWishList] = useState(null);

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
                <Text>Aggiungi un libro nella tua Lista Desideri per ricevere una notifica appena qualcuno lo aggiunge</Text>
                <View>
                    <View>
                    <Text>Titolo: </Text>
                    <TextInput
                        onChangeText={() => setTitle(this.value)}
                        value={title}
                    />
                    </View>
                    <View>
                    <Text>Autore: </Text>
                    <TextInput
                        onChangeText={() => setAuthor(this.value)}
                        value={author}
                    />
                    </View>
                    <View>
                    <Text>Editore: </Text>
                    <TextInput
                        onChangeText={() => setEditor(this.value)}
                        value={editor}
                    />
                    </View>
                    <View>
                    <Text>ISBN: </Text>
                    <TextInput
                        onChangeText={() => setISBN(this.value)}
                        value={isbn}
                    />
                    </View>
                    <View>
                        <Text>Materia: </Text>
                        <TextInput
                        onChangeText={() => setSubject(this.value)}
                        value={subject}
                        />
                    </View>
                    <View>
                        <Text>Professore: </Text>
                        <TextInput
                        onChangeText={() => setTeacher(this.value)}
                        value={teacher}
                        />
                    </View>
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
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  