import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from "./src/book-finder/homepage";
import Messages from "./src/book-finder/scenes/messages";
import Profile from "./src/book-finder/scenes/profile";
import Search from './src/book-finder/scenes/search';


const MainNavigator = createStackNavigator({
  Home: {screen: HomePage},
  Messages: {screen: Messages},
  Profile: {screen: Profile},
  Search: {screen: Search},
});

const App = createAppContainer(MainNavigator);

export default App;
