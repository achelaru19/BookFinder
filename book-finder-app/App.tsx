import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import HomePage from './src/book-finder/homepage';
import Messages from './src/book-finder/scenes/messages';
import Profile from './src/book-finder/scenes/profile';
import Search from './src/book-finder/scenes/search';

const { width } = Dimensions.get("window");

const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#ff7a59', opacity: 0.9 }}>
        <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }} />
          {
          //<Image source={require('./assets/no-image.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
          //</View>
          }
        <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Text>Angel Chelaru</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Icon name="train" onPress={() => console.log("logout")} />
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
      title: 'BookFinder'
    }
  },
  Messages: {
    screen: Messages,
    navigationOptions: {
      title: 'Messages'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Settings'
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search'
    }
  }
},
{
  drawerPosition: 'left',
  contentComponent: CustomDrawerNavigation,
  drawerType: 'slide',
  drawerWidth: (width / 3) * 2
});

const App = createAppContainer(Drawer);
export default App;
