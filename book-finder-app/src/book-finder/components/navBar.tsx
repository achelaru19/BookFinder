import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconButton } from 'react-native-paper';


interface Props {
  navigation: any
}

class NavBar extends React.Component<Props> {

constructor(props){
  super(props);
}

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch',}}>
        <IconButton
          icon="home"
          onPress={() => navigate('Home', {name: 'HomePage'})}
        />
        <IconButton
          icon="email"
          onPress={() => navigate('Messages', {name: 'Messages'})}
        />
        <IconButton
          icon="magnify"
          onPress={() => navigate('Search', {name: 'Search'})}
        />
        <IconButton
          icon="settings"
          onPress={() => navigate('Profile', {name: 'Profile'})}
        />
        <IconButton
          icon="logout"
          onPress={() => navigate('Profile', {name: 'Profile'})}
        />
      </View> 
    );
  }
}


export default withNavigation(NavBar);