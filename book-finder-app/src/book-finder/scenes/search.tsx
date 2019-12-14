import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import NavBar from '../components/navBar';

interface Props {
  navigation: any
}


export default class Search extends React.Component<Props> {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <NavBar/>
        <View style={{flex: 12}}>
          <Text>Titolo: </Text> 
        </View>
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
  