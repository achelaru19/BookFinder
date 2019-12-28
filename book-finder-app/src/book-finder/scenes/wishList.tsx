import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';
import NavBar from "../components/navBar";
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';

export default function WishList () {
  const [fontLoaded, setLoadedFont] = useState(false);
  const [booksInWishList, setWishList] = useState(null);

  useEffect(() => {
    let books = [
      {
        'title': 'Fisica Generale',
        'author': 'Pozzoli',
        'editor': 'Mondadori'
      },
      {
        'title': 'Cracking the Coding Interview',
        'author': 'Gayle Laakmann McDowell',
        'editor': 'CareerCup'
      },
      {
        'title': 'Fondamenti di Jaca',
        'author': 'Luke McPrecessor',
        'editor': 'Rizzoli'
      }
    ];

    //setWishList(books);
  }, []);

  const navigation = useNavigation();

  if(!fontLoaded)
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadedFont)} 
      />
      );
  else {
    if(booksInWishList != null) 
      return (
        <View style={{flex: 1}}>
          <NavBar title="Lista Desideri"/>
          <ScrollView>
          {booksInWishList.map(book =>
            <Text key={book.title}>
              {book.title} {book.author} {book.editor}
            </Text>
          )}
          <Button title="Aggiungi libro alla Lista Desideri" onPress={() => navigation.navigate('AddBookToWishList')} />
          </ScrollView>
        </View>
      );
    else
      return (
          <View style={{flex: 1}}>
              <NavBar title="Lista Desideri"/>
              <Text>Non ci sono libri nella tua lista desideri</Text>
              <Button title="Aggiungi libro" onPress={() => navigation.navigate('AddBookToWishList')} />
          </View>
      );
      
    }
  }
  
  WishList.navigationOptions = ({ navigation }) => ({
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
  });
  