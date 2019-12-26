import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavBar from "../components/navBar";
import * as Font from 'expo-font';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { Icon } from 'react-native-elements';
import { AppLoading } from 'expo';

export default function WishList () {
 
  const [fontLoaded, setLoadedFont] = useState(false);

  useEffect(() => {

  }, []);

  if(!fontLoaded)
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadedFont)} 
      />
      );
  else 
    return (
        <View style={{flex: 1}}>
            <NavBar title="Lista Desideri"/>
            <Text>My wish list</Text>
        </View>
    );
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
  