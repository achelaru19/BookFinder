import React, { useEffect, useState, useContext } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import {getUser, getBooksAroundUser} from './actions/firebaseDB';
import NavBar from './components/navBar';
import BookInformation from './components/bookInformation';
import { AppLoading } from 'expo';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from './utils/fontLoader';
import { DrawerItems } from 'react-navigation-drawer';
import { UserContext } from './consts/context';

interface User {
  email: string;
  firstname: string;
  lastname: string;
  university: string;
  faculty: string;
  birthdate: string;
}

export default function HomePage() {
  

  const [fontLoaded, setFontLoaded] = useState(false);
  const [booksAroundMe, setBooksAroundMe] = useState([]); 
                                                      
  const [user, setUser] = useState(null);
  // @ts-ignore
  const [globalUser, setGlobalUser] = useContext(UserContext);
  const [isUserSet, userHasBeenSet] = useState(false);

  const { navigate } = useNavigation();
  const navigation = useNavigation();
  
  const email = navigation.getParam('email');

  const updateUser = (u) => {
    setUser(u);
    userHasBeenSet(true);
  }

  useEffect(() => {
    getUser(email, u => updateUser(u));
  }, []);

  useEffect(() => {
    getBooksAroundUser(user, (b) => setBooksAroundMe(b))
    console.log(booksAroundMe)
  }, [isUserSet])
 
  

  if(!fontLoaded || !isUserSet)
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setFontLoaded)} 
      />
      );
  else {
    setGlobalUser(user);
    return (
          <View style={{flex: 1,flexDirection: 'column',
          justifyContent: 'center',
          borderTopWidth: 10,
          alignItems: 'stretch',}}>
            <NavBar title="BookFinder" user={user}/>
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
}


HomePage.navigationOptions = ({ navigation }, screenProps) => ({
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
