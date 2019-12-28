import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';
import NavBar from "../components/navBar";
import { useNavigation } from 'react-navigation-hooks';

export default function ChangePassword() {
  const [id, setID] = useState(3);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  useEffect(() => {

  }, []);

  const navigation = useNavigation();

  const changePassword = () => {
      if(newPassword1 != newPassword2){
        setPasswordMatch(false);
      } else {
        // Change password
        //if(oldPassword != notCorrect) {
        // setIncorrectPassword(true);
        //}
        // Logout
        navigation.navigate('Home');
      }
  }

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
            <NavBar title="Cambia Password" />
            <View>
                <TextInput secureTextEntry={true} style={{}} placeholder="Vecchia Password" onChangeText={(value) => setOldPassword(value)} />
                <TextInput secureTextEntry={true} style={{}} placeholder="Nuova Password" onChangeText={(value) => setNewPassword1(value)}  />
                <TextInput secureTextEntry={true} style={{}} placeholder="Ripeti nuova password" onChangeText={(value) => setNewPassword2(value)} />
                {
                    passwordMatch ? null : <Text>Le due password non sono identiche</Text>
                }
                {
                    incorrectPassword ? <Text>La password inserita non &eacute; corretta</Text> : null
                }
            </View>
            <View>
                <TouchableOpacity style={styles.buttonBox} onPress={() => changePassword()}>
                    <Text style={styles.button}>Cambia Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

ChangePassword.navigationOptions = ({ navigation }) => ({
    title: 'Cambia Password',
    drawerLabel: () => null
  });

const styles = StyleSheet.create({
    buttonBox: {

    },
    button: {

    }
});