import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppLoading, AuthSession } from 'expo';
import {getWishList} from '../actions/firebaseDB';
import NavBar from "../components/navBar";
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';

export default function WishList () {
  const [fontLoaded, setLoadedFont] = useState(false);
  const [booksInWishList, setWishList] = useState(null);

  useEffect(() => {
    getWishList("angel.chelaru@gmail.com", (books) => setWishList(books));
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
    if(booksInWishList != null) {
      return (
        <View style={{flex: 1}}>
          <NavBar title="Lista Desideri"/>
          <SafeAreaView style={{ flex: 12, flexDirection: 'column', paddingBottom: 5 }}>
            <View >
                <SwipeableFlatList
                    data={booksInWishList}
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
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 3}}>
            <View style={styles.buttonWithElements}>
              <View style={{flexDirection: 'column', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => navigation.navigate('AddBookToWishList')}>
                  <Text style={styles.buttonLabel}>Aggiungi libro</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
    else
      return (
          <View style={{flex: 1}}>
              <NavBar title="Lista Desideri"/>
              <View style={styles.container}>
                <Image style={styles.imageHolder} source={require('../assets/images/wish-book.png')} />
                <Text style={styles.textHolder}>Non ci sono libri nella tua lista desideri</Text>
                <View style={styles.addButton}>
                  <View style={{flexDirection: 'column', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddBookToWishList')}>
                      <Text style={styles.buttonLabel}>Aggiungi libro</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </View>
      );
      
    }
  }
  
  WishList.navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
        <Icon name="star" style={{ fontSize: 24, color: tintColor }} />
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
  buttonWithElements: {
    backgroundColor: '#90001F',
    height: 50,
    width: Math.round(Dimensions.get('window').width)-10,
    alignContent: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
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
  }
});
  