import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavBar from './components/navBar';

interface Props {
  navigation: any
}


export default class HomePage extends React.Component<Props> {
  static navigationOptions = {
    title: 'BookFinder',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <NavBar/>
      </View>
    );
  }
  }

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  