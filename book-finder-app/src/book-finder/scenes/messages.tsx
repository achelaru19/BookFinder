import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import NavBar from '../components/navBar';
import Message from '../components/message';
import { UserContext } from '../consts/context';
import { getLastMessages } from '../actions/firebaseDB';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { IMessage } from 'react-native-gifted-chat';
import { LastMessageType } from '../types/lastMessageType';


export default function Messages() {
  const [messages, setMessages] = useState<LastMessageType[]>([]);

  // @ts-ignore
  const [user, setUser] = useContext(UserContext);
  const [counterLastMessangeChanged, changeLastMessage] = useState(0);

  useEffect(() => {
    getLastMessages(user.email, messages => setMessages(messages));
  }, [counterLastMessangeChanged]) 

  const increaseLastMessage = () => changeLastMessage(counterLastMessangeChanged + 1);

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
  lastMessageBox: {
    flex:1,
    height: 20,

  },
  messages: {
    flex: 1,
    flexDirection: 'row',

  }
});
