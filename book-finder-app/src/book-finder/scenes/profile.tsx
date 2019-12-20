import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavBar from "../components/navBar";

// IMPORTING TYPES
import {UserInfo} from "../types/userInfo";
import { Icon } from 'react-native-elements';

interface Props {
  navigation: any
}

export default class Profile extends React.Component<Props> {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="settings" style={{ fontSize: 24, color: tintColor }} />
    )
  }

  state: UserInfo = {
    id: 3,
    username: "angel.chelaru",
    firstname: "Angel",
    lastname: "Chelaru",
    birthdate: "1996-02-19",
    email: "angel.chelaru@gmail.com",
    university: "Politecnico di Milano",
    faculty: "Computer Science and Engineering"
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={{flex: 1}}>
          <NavBar />
          <View style={{flex: 12}}>
            <Text>Username: {this.state.username}</Text>
            <Text>Nome: {this.state.firstname}</Text>
            <Text>Cognome: {this.state.lastname}</Text>
            <Text>Email: {this.state.email}</Text>
            <Text>Data di nascita: {this.state.birthdate}</Text>
            <Text>Universit&agrave;: {this.state.university}</Text>
            <Text>Facolt&agrave;: {this.state.faculty}</Text>
            <Button title="Cambia Password" onPress={() => console.log("Go to change password page")}/>
            <Button title="Cambia Universit&agrave;" onPress={() => console.log("Go to change University page")}/>
          </View>
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
  