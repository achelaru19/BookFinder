import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomDrawerNavigation from './src/book-finder/components/customDrawerNavigation';
import HomePage from './src/book-finder/homepage';
import Messages from './src/book-finder/scenes/messages';
import Settings from './src/book-finder/scenes/settings';
import Search from './src/book-finder/scenes/search';
import Result from './src/book-finder/scenes/results';
import AddBook from './src/book-finder/scenes/addBook';
import WishList from './src/book-finder/scenes/wishList';
import Chat from './src/book-finder/scenes/chat';
import AddBookToWishList from './src/book-finder/scenes/addBookToWishlist';
import MyBooks from './src/book-finder/scenes/myBooks';
import Login from './src/book-finder/scenes/login';
import SignUp from './src/book-finder/scenes/signup';
import ForgottenPassword from './src/book-finder/scenes/forgottenPassword';
import { UserProvider } from './src/book-finder/consts/context';

const { width } = Dimensions.get("window");
console.disableYellowBox = true;

const Drawer = createDrawerNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  ForgottenPassword: {
    screen: ForgottenPassword
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
  Chat: {
    screen: Chat,
    navigationOptions: {
      title: 'Chat'
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
  }
},
{
  drawerPosition: 'left',
  contentComponent: props => <CustomDrawerNavigation {...props}/>,
  drawerType: 'slide',
  drawerWidth: (width / 3) * 2,
  initialRouteName : 'Login'
});

const AppNavigation = createAppContainer(Drawer);

const App = () =>  (
  <UserProvider>
    <AppNavigation />
  </UserProvider>
);
export default App;