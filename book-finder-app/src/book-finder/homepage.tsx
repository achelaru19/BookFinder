import React, { useEffect, useState, useContext } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import {getUser, getBooksAroundUser, addToken} from './actions/firebaseDB';
import NavBar from './components/navBar';
import BookInformation from './components/bookInformation';
import { AppLoading } from 'expo';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from './utils/fontLoader';
import { UserContext } from './consts/context';
import { BookType } from './types/bookType';
import { UserType } from './types/userType';
import { updateToken } from './utils/pushNotificationUtils';

export default function HomePage() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [booksAroundMe, setBooksAroundMe] = useState<BookType[]>([]);                                            
  const [user, setUser] = useState<UserType | null>(null);
  // @ts-ignore
  const [globalUser, setGlobalUser] = useContext<UserType>(UserContext);
  const [isUserSet, userHasBeenSet] = useState<boolean>(false);

  const { navigate } = useNavigation();
  const navigation = useNavigation();
  
  const email: string = navigation.getParam('email');

  const updateUser = (user) => {
    setUser(user);
    userHasBeenSet(true);
  }

  useEffect(() => {
    getUser(email, u => updateUser(u));
  }, [email]);

  useEffect(() => {
    getBooksAroundUser(user, (b) => setBooksAroundMe(b))
    if(isUserSet){
      updateToken(user.email, user.university, (email, token, uni) => addToken(email, token, uni));
    }
  }, [isUserSet, user])

  if(!fontLoaded || !isUserSet){
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
            <NavBar title={'Book Finder'}/>
              <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#90001F" />
              </View>
          </View>
        );
  }
  else {
    setGlobalUser(user);
    return (
          <View style={{flex: 1,flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',}}>
            <NavBar title="BookFinder"/>
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
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
