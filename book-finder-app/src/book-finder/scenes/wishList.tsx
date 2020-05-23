import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';
import {getWishList, removeFromWishList} from '../actions/firebaseDB';
import NavBar from "../components/navBar";
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import { UserContext } from '../consts/context';
import { styles } from '../styles/wishlistStyle';
import { WishListBookType } from '../types/wishlistBookType';
import { UserType } from '../types/userType';


export default function WishList () {

  const [fontLoaded, setLoadedFont] = useState<boolean>(false);
  const [booksInWishList, setWishList] = useState<WishListBookType[] | null>(null);
  const [counter, setCounter] = useState<number>(0);
  //@ts-ignore
  const [user] = useContext<UserType>(UserContext);
  const navigation = useNavigation();
  
  const increaseCounter = () => setCounter(counter + 1);
  
  useEffect(() => {
    getWishList(user.email, (books) => setWishList(books));
  }, [counter]);

  const removeBookFromWishList = (email, title, author, editor, isbn) => {
    removeFromWishList(email, title, author, editor, isbn);
    const newBooks = booksInWishList.filter(val => !(val.title == title && val.author == author && val.editor == editor && val.isbn == isbn));
    setWishList(newBooks);
  };

  if(!fontLoaded)
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadedFont)} 
      />
    );
  else {
    if(booksInWishList === null){
      return(
        <View style={{flex: 1}}>
          <NavBar title={'Lista Desideri'}/>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#90001F" />
            </View>
        </View>
      );
    } 
    else {
      if(booksInWishList.length > 0) 
        return (
          <View style={{flex: 1}}>
            <NavBar title="Lista Desideri"/>
            <SafeAreaView style={{ flex: 12, flexDirection: 'column', paddingBottom: 5 }}>
              <View>
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
                          <Icon name="delete" size={30} onPress={() => removeBookFromWishList(user.email, item.title, item.author, item.editor, item.isbn)} />
                      </View>
                  )}
                  backgroundColor={'white'}
                />
              </View>
            </SafeAreaView >
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 3}}>
              <View style={styles.buttonWithElements}>
                <View style={{flexDirection: 'column', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => navigation.navigate('AddBookToWishList', { 'addBook': () => increaseCounter()})}>
                    <Text style={styles.buttonLabel}>Aggiungi libro</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      else
        return (
          <View style={{flex: 1}}>
              <NavBar title="Lista Desideri"/>
              <View style={styles.container}>
                <Image style={styles.imageHolder} source={require('../assets/images/wish-book.png')} />
                <Text style={styles.textHolder}>Non ci sono libri nella tua lista desideri</Text>
                <View style={styles.addButton}>
                  <View style={{flexDirection: 'column', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddBookToWishList', { 'addBook': () => increaseCounter()})}>
                      <Text style={styles.buttonLabel}>Aggiungi libro</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </View>
        ); 
    }
  }
  
}
  
WishList.navigationOptions = ({ navigation }) => ({
  drawerIcon: ({ tintColor }) => (
      <Icon name="star" style={{ fontSize: 24, color: tintColor }} />
  )
})


