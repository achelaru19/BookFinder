import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavBar from "../components/navBar";

interface Props {
  navigation: any
}

export default class Profile extends React.Component<Props> {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View>
          <NavBar />
          <Text>Sono nel profilo</Text>
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
  