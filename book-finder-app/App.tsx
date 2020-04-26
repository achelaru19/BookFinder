import React, { useContext } from 'react';
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
import Chat from './src/book-finder/scenes/chat';
import AddBookToWishList from './src/book-finder/scenes/addBookToWishlist';
import MyBooks from './src/book-finder/scenes/myBooks';
import Login from './src/book-finder/scenes/login';
import SignUp from './src/book-finder/scenes/signup';
import ForgottenPassword from './src/book-finder/scenes/forgottenPassword';
import { UserContext, UserProvider } from './src/book-finder/consts/context';
import { logout } from './src/book-finder/utils/functions';
import { useNavigation } from 'react-navigation-hooks';
import {shortenNameIfTooLong} from './src/book-finder/utils/functions';
const { width } = Dimensions.get("window");

const CustomDrawerNavigation = (props) => {
  //@ts-ignore
  const [user] = useContext(UserContext);
  const navigation = useNavigation();


  const loggingOut = () => {
    logout();
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#90001F', opacity: 0.9 }}>
        <View style={{ height: 225, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }} >
           <Image source={require('./src/book-finder/assets/images/student-logo.png')} style={{ height: 150, width: 150, borderRadius: 60, marginTop: 30 , backgroundColor: '#fff' }} />
        </View>
        <View style={{ height: 25, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
  <Text style={{fontSize: 20, marginBottom: 20, color: 'white'}}>{shortenNameIfTooLong(user.firstname + " " + user.lastname)}</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Icon name="arrow-circle-o-right" size={30} onPress={() => loggingOut()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

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