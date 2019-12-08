import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface Props {
  navigation: any
}

export default class Messages extends React.Component<Props> {
  static navigationOptions = {
    title: 'Messages',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Home"
        onPress={() => navigate('Home', {name: 'HomePage'})}
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
  