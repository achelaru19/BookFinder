import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomePage from '../homepage';
import NavBar from '../components/navBar';

interface Props {
  navigation: any
}


export default class Messages extends React.Component<Props> {
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View>
          <NavBar />
          <Text>Sono nei messaggi</Text>
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
  