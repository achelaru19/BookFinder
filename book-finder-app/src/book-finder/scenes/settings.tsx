import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavBar from "../components/navBar";
import * as Font from 'expo-font';
import { Icon } from 'react-native-elements';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import { AppLoading } from 'expo';

export default function Settings() {
  const [id, setID] = useState(3);
  const [username, setUsername] = useState("angel.chelaru");
  const [firstname, setFirstname] = useState("Angel");
  const [lastname, setLastname] = useState("Chelaru");
  const [birthdate, setBirthdate] = useState("1996-02-19");
  const [email, setEmail] = useState("angel.chelaru@gmail.com");
  const [university, setUniversity] = useState("Politecnico di Milano");
  const [faculty, setFaculty] = useState("Computer Science and Engineering");
  const [fontLoaded, setFontLoaded] = useState(false);
  
  useEffect(() => {

  }, []);

  if(!fontLoaded)
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setFontLoaded)} 
      />
      );
  else 
    return (
      <View style={{flex: 1}}>
        <NavBar title="Impostazioni" />
        <View style={{flex: 9, flexDirection: 'column', alignItems: 'stretch'}}>
          <View style={styles.box}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.information}>{username}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Nome </Text>
            <Text style={styles.information}>{firstname}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Cognome </Text>
            <Text style={styles.information}>{lastname}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Email </Text>
            <Text style={styles.information}>{email}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Data di nascita </Text>
            <Text style={styles.information}>{birthdate}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Universit&agrave; </Text>
            <Text style={styles.information}>{university}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Facolt&agrave;  </Text>
            <Text style={styles.information}>{faculty}</Text>
          </View>
          <View style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
            <TouchableOpacity style={styles.buttonBox} onPress={() => console.log("Go to change password page")}>
              <Text style={{fontFamily: 'Cardo-Regular', color: 'white', fontSize: 20}}>Cambia Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBox} onPress={() => console.log("Go to change University page")}>
              <Text style={{fontFamily: 'Cardo-Regular', color: 'white', fontSize: 20}}>Modifica Informazioni</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}
  
Settings.navigationOptions = ({ navigation }) => ({
  drawerIcon: ({ tintColor }) => (
      <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
  )
});

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
    fontFamily: 'Cardo-Regular',
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
