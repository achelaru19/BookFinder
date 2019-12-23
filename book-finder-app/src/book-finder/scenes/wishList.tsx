import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavBar from "../components/navBar";
import * as Font from 'expo-font';

// IMPORTING TYPES
import { Icon } from 'react-native-elements';

export default function WishList () {
 
  const [fontLoaded, setLoadedFont] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Cardo': require('../assets/fonts/Cardo-Regular.ttf'),
      'Cardo-Bold': require('../assets/fonts/Cardo-Bold.ttf'),
    });
    setLoadedFont(true);
  })

    return fontLoaded ? (
        <View style={{flex: 1}}>
            <NavBar title="Lista Desideri"/>
            <Text>My wish list</Text>
        </View>
    ) : null;
  }
  
  WishList.navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
        <Icon name="book" style={{ fontSize: 24, color: tintColor }} />
    )
  })


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  