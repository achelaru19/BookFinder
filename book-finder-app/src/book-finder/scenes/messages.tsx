import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import NavBar from '../components/navBar';
import Message from '../components/message';
import { UserContext } from '../consts/context';
import { getLastMessages } from '../actions/firebaseDB';


export default function Messages() {
  const [messages, setMessages] = useState([]);

  // @ts-ignore
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    getLastMessages(user.email, messages => setMessages(messages));

  }, []) 

  if(messages.length > 0)
    return (
        <View style={styles.lastMessageBox}>
          <NavBar title="Messaggi" />
          <View style={{flex: 12}}>
            {messages.map(mess => 
              <Message message={mess} key={'message_' + mess.messageID} />
            )}
          </View>
        </View>
    );
  else
    return <View />
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
  lastMessageBox: {
    flex:1,
    height: 20,

  }
});
