import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import NavBar from '../components/navBar';
import Message from '../components/message';
import { Icon } from 'react-native-elements';


export default function Messages() {
  const [messages, setMessages] = useState([{messageID:2, sender: 3, message: 'Ciao! mi servirebbe quel libro'}, {messageID: 34, sender: 4, message: 'Come va?'}, {messageID: 12, sender: 2, message: 'Hai anche il libro di Caio?'}]);

  return (
      <View style={{flex: 1}}>
        <NavBar title="Messaggi" />
        <View style={{flex: 12}}>
          {messages.map(mess => 
            <Message sender={mess.sender} message={mess.message} key={'message_' + mess.messageID} />
          )}
        </View>
      </View>
  );
}

Messages.navigationOptions = ({ navigation }) => ({
  drawerIcon: ({ tintColor }) => (
      <Icon name="mail" style={{ fontSize: 24, color: tintColor }} />
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
