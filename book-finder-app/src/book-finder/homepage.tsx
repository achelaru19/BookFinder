import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface Props {
  navigation: any
}


export default class HomePage extends React.Component<Props> {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to messages"
        onPress={() => navigate('Messages', {name: 'Messages'})}
      />
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
  