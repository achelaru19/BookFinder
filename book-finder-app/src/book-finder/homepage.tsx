import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import {getUser} from './actions/firebaseDB';
import NavBar from './components/navBar';
import BookInformation from './components/bookInformation';
import { AppLoading } from 'expo';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from './utils/fontLoader';

export default function HomePage() {
  

  const [fontLoaded, setFontLoaded] = useState(false);
  const [userID, setUserID] = useState(3);
  const [booksAroundMe, setBooksAroundMe] = useState([{title: 'Titolo1', author: 'Autore 1', editor: 'Editore 1'}, 
                                                      {title: 'Titolo2', author: 'Autore 2', editor: 'Editore 2'}, 
                                                      {title: 'Titolo3', author: 'Autore 1', editor: 'Editore 1'}, 
                                                      {title: 'Titolo4', author: 'Autore 2', editor: 'Editore 2'}, 
                                                      {title: 'Titolo5', author: 'Autore 1', editor: 'Editore 1'}, 
                                                      {title: 'Titolo6', author: 'Autore 2', editor: 'Editore 2'}, 
                                                      {title: 'Titolo7', author: 'Autore 3', editor: 'Editore 3'}]); 


  const { navigate } = useNavigation();


  useEffect(() => {
    // get userID
    // get booksAroundMe
    
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
      <View style={{flex: 1,flexDirection: 'column',
      justifyContent: 'center',
      borderTopWidth: 10,
      alignItems: 'stretch',}}>
        <NavBar title="BookFinder" />
        <View style={{flex: 12}}>
          <ScrollView style={{flex: 11}}>
            {booksAroundMe.map((book, index) => <BookInformation book={book} key={'book-info-'+index}/>)}
          </ScrollView>
          <View style={styles.addBookButton} onTouchEnd={() => navigate('AddBook')}>
            <Text style={styles.plusSign}>+</Text>
          </View>
        </View>
      </View>
    );
}


HomePage.navigationOptions = ({ navigation }) => ({
  drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
  ) 
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBookButton: {
    position: 'absolute',
    backgroundColor: '#90001F',
    width: 50,
    height: 50,
    borderRadius: 100,
    bottom: 40,
    right:40,
  },
  plusSign: {
    fontSize: 35, 
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white'
  },
});
