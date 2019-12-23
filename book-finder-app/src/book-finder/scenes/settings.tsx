import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavBar from "../components/navBar";
import * as Font from 'expo-font';

// IMPORTING TYPES
import {UserInfo} from "../types/userInfo";
import { Icon } from 'react-native-elements';

interface Props {
  navigation: any
}

export default class Settings extends React.Component<Props> {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
    )
  }
  
  
  async componentDidMount() {
    await Font.loadAsync({
      'Cardo': require('../assets/fonts/Cardo-Regular.ttf'),
      'Cardo-Bold': require('../assets/fonts/Cardo-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  state = {
    id: 3,
    username: "angel.chelaru",
    firstname: "Angel",
    lastname: "Chelaru",
    birthdate: "1996-02-19",
    email: "angel.chelaru@gmail.com",
    university: "Politecnico di Milano",
    faculty: "Computer Science and Engineering",
    fontLoaded: false
  };

  render() {
    return this.state.fontLoaded ? (
        <View style={{flex: 1}}>
          <NavBar title="Impostazioni" />
          <View style={{flex: 9, flexDirection: 'column', alignItems: 'stretch'}}>
            <View style={styles.box}>
              <Text style={styles.label}>Username</Text>
              <Text style={styles.information}>{this.state.username}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Nome </Text>
              <Text style={styles.information}>{this.state.firstname}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Cognome </Text>
              <Text style={styles.information}>{this.state.lastname}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Email </Text>
              <Text style={styles.information}>{this.state.email}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Data di nascita </Text>
              <Text style={styles.information}>{this.state.birthdate}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Universit&agrave; </Text>
              <Text style={styles.information}>{this.state.university}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Facolt&agrave;  </Text>
              <Text style={styles.information}>{this.state.faculty}</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
              <TouchableOpacity style={styles.buttonBox} onPress={() => console.log("Go to change password page")}>
                <Text style={{fontFamily: 'Cardo', color: 'white', fontSize: 20}}>Cambia Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonBox} onPress={() => console.log("Go to change University page")}>
                <Text style={{fontFamily: 'Cardo', color: 'white', fontSize: 20}}>Modifica Informazioni</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    ) : null;
  }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'stretch',
      justifyContent: 'space-around',
      flexDirection: 'column',
      borderBottomWidth: 0.5,
      borderColor: 'black',
      paddingLeft: 10,
      fontFamily: ''
    },
    label: {
      color: '#a9a9a9',
      fontFamily: 'Cardo',
      fontSize: 15
      
    },
    information: {
      fontSize: 18,
      fontFamily: 'Cardo-Bold'
    },
    buttonBox: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: '#BF002A',
      color: 'white',
      width: 280,
      maxHeight: 50,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  