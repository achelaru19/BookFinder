import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import NavBar from '../components/navBar';
import Message from '../components/message';
import { UserContext } from '../consts/context';
import { getLastMessages } from '../actions/firebaseDB';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../styles/messagesStyle';
import { LastMessageType } from '../types/lastMessageType';
import { UserType } from '../types/userType';


export default function Messages() {
  
  const [messages, setMessages] = useState<LastMessageType[] | null>(null);
  //@ts-ignore
  const [user] = useContext<UserType>(UserContext);
  const [counterLastMessangeChanged, changeLastMessage] = useState(0);

  useEffect(() => {
    getLastMessages(user.email, messages => setMessages(messages));
  }, [counterLastMessangeChanged]) 

  const increaseLastMessage = () => changeLastMessage(counterLastMessangeChanged + 1);

  if(messages === null){
    return (
      <View style={{flex: 1}}>
        <NavBar title="Messaggi" />
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#90001F" />
        </View>
      </View>
    );
  } 
  else {
    if(messages.length > 0)
      return (
          <View style={styles.lastMessageBox}>
            <NavBar title="Messaggi" />
            <View style={styles.messages}> 
              <SafeAreaView>
              <ScrollView>
                {messages.map(mess => 
                  <Message message={mess} changeLastMessage={increaseLastMessage} key={'message_' + mess.conversationWith} />
                )}
              </ScrollView>
              </SafeAreaView>
            </View>
          </View>
      );
    else
      return (
        <View style={{flex: 1}}>
          <NavBar title="Messaggi" />
          <View style={styles.container}>
                <Image style={styles.imageHolder} source={require('../assets/images/no_message.png')} />
                <Text style={styles.textHolder}>Non ci sono messaggi</Text>
              </View>
        </View>
      );
  }
}

Messages.navigationOptions = ({ navigation }) => ({
  drawerIcon: ({ tintColor }) => (
      <Icon name="mail" style={{ fontSize: 24, color: tintColor }} />
  )
});

