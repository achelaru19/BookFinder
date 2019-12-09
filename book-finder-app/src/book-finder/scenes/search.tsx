import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavBar from '../components/navBar';

interface Props {
  navigation: any
}


export default class Search extends React.Component<Props> {
  static navigationOptions = {
    title: 'Welcome',
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
  