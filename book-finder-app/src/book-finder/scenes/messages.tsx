import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomePage from '../homepage';
import NavBar from '../components/navBar';
import Message from '../components/message';
import { Icon } from 'react-native-elements';

interface Props {
  navigation: any
}

interface MessageType {
  messageID: number,
  sender: number,
  message: string
}

interface MessagesType {
  messages: MessageType[]
}


export default class Messages extends React.Component<Props> {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="mail" style={{ fontSize: 24, color: tintColor }} />
    )
  }

  state: MessagesType = {
    messages: [{messageID:2, sender: 3, message: 'Ciao! mi servirebbe quel libro'}, {messageID: 34, sender: 4, message: 'Come va?'}, {messageID: 12, sender: 2, message: 'Hai anche il libro di Caio?'}]
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={{flex: 1}}>
          <NavBar />
          <View style={{flex: 12}}>
            {this.state.messages.map(mess => 
              <Message sender={mess.sender} message={mess.message} key={'message_' + mess.messageID} />
            )}
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
  