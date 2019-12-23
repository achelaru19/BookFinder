import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import HomePage from './src/book-finder/homepage';
import Messages from './src/book-finder/scenes/messages';
import Settings from './src/book-finder/scenes/settings';
import Search from './src/book-finder/scenes/search';
import AddBook from './src/book-finder/scenes/addBook';
import WishList from './src/book-finder/scenes/wishList';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get("window");

const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#90001F', opacity: 0.9 }}>
        <View style={{ height: 225, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }} >
           <Image source={require('./src/book-finder/assets/images/student-logo.png')} style={{ height: 150, width: 150, borderRadius: 60, marginTop: 30 , backgroundColor: '#fff' }} />
        </View>
        <View style={{ height: 25, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 20, marginBottom: 20}}>Angel Chelaru</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Icon name="arrow-circle-o-right" size={30} onPress={() => console.log("logout")} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


const Drawer = createDrawerNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home'
    }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      title: 'Messaggi'
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Impostazioni'
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search'
    }
  },
  AddBook: {
    screen: AddBook,
    navigationOptions: {
      title: 'AddBook'
    }
  },
  WishList: {
    screen: WishList,
    navigationOptions: {
      title: 'Lista Desideri'
    }
  },
},
{
  drawerPosition: 'left',
  contentComponent: CustomDrawerNavigation,
  drawerType: 'slide',
  drawerWidth: (width / 3) * 2
});

const App = createAppContainer(Drawer);
export default App;
