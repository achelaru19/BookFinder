import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomePage from './src/book-finder/homepage';
import Messages from './src/book-finder/scenes/messages';
import Settings from './src/book-finder/scenes/settings';
import Search from './src/book-finder/scenes/search';
import Result from './src/book-finder/scenes/results';
import AddBook from './src/book-finder/scenes/addBook';
import WishList from './src/book-finder/scenes/wishList';
import AddBookToWishList from './src/book-finder/scenes/addBookToWishlist';
import ChangePassword from './src/book-finder/scenes/changePassword';
import MyBooks from './src/book-finder/scenes/myBooks';
import Login from './src/book-finder/scenes/login';
import SignUp from './src/book-finder/scenes/signup';
const { width } = Dimensions.get("window");


const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#90001F', opacity: 0.9 }}>
        <View style={{ height: 225, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }} >
           <Image source={require('./src/book-finder/assets/images/student-logo.png')} style={{ height: 150, width: 150, borderRadius: 60, marginTop: 30 , backgroundColor: '#fff' }} />
        </View>
        <View style={{ height: 25, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 20, marginBottom: 20, color: 'white'}}>Angel Chelaru</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Icon name="arrow-circle-o-right" size={30} onPress={() => console.log('logout')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


const Drawer = createDrawerNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home'
    }
  },
  MyBooks: {
    screen: MyBooks, 
    navigationOptions: {
      title: 'I Miei Libri'
    }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      title: 'Messaggi'
    }
  },
  WishList: {
    screen: WishList,
    navigationOptions: {
      title: 'Lista Desideri'
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Impostazioni'
    }
  },
  Search: {
    screen: Search
  },
  Result: {
    screen: Result
  },
  AddBook: {
    screen: AddBook
  },
  AddBookToWishList: {
    screen: AddBookToWishList
  },
  ChangePassword: {
    screen: ChangePassword
  }
},
{
  drawerPosition: 'left',
  contentComponent: CustomDrawerNavigation,
  drawerType: 'slide',
  drawerWidth: (width / 3) * 2,
  initialRouteName : 'Login'
});

const App = createAppContainer(Drawer);
export default App;