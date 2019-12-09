import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


interface Props {
  navigation: any
}

class NavBar extends React.Component<Props> {
  static navigationOptions = {
    title: 'BookFinder',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button
          icon={<Icon name="rocket" size={30} color="#900" />}
          title="Home"
          onPress={() => navigate('Home', {name: 'HomePage'})}
        />
        <Button
          title="Messages"
          onPress={() => navigate('Messages', {name: 'Messages'})}
        />
        <Button
          title="Search"
          onPress={() => navigate('Search', {name: 'Search'})}
        />
        <Button
          title="Profile"
          onPress={() => navigate('Profile', {name: 'Profile'})}
        />
      </View> 
    );
  }
}


export default withNavigation(NavBar);