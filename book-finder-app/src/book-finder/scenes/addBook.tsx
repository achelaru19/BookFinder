import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavBar from '../components/navBar';
import BarcodeScan from '../components/barcodeScan';

export default function AddBook() {

  return (
    <View style={{flex: 1}}>
      <NavBar title="Aggiungi un libro"/>
      <View style={{flex: 4}}>
          <BarcodeScan />
      </View>
    </View>
  );
}

AddBook.navigationOptions = ({ navigation }) => ({
  title: 'AddBook',
  drawerLabel: () => null
});
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
  cameraIcon: {
          margin: 5,
          height: 40,
          width: 40
      },
    bottomOverlay: {
          position: "absolute",
          width: "100%",
          flex: 20,
          flexDirection: "row",
          justifyContent: "space-between"
      },
});
