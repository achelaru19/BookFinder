import React from 'react';
import { StyleSheet, View } from 'react-native';

import NavBar from '../components/navBar';
import BarcodeScan from '../components/barcodeScan';

interface Props {
  navigation: any
}

interface myState {
    torchOn: string,
    cameraType: string
}


export default class AddBook extends React.Component<Props> {
  static navigationOptions = {
    title: 'AddBook',
    drawerLabel: () => null
  };


  render() {
    return (
      <View style={{flex: 1}}>
        <NavBar title="Aggiungi un libro"/>

        <View style={{flex: 4}}>
            <BarcodeScan />
        </View>
        
      </View>
    );
  }
  handleTourch(value) {
    if (value === true) {
        this.setState({ torchOn: false });
    } else {
        this.setState({ torchOn: true });
    }
}
  }

  
 

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
  