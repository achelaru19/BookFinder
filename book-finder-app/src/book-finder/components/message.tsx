import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';
import { ListItem } from 'react-native-elements';
import { getInitials } from '../utils/functions';




export default function Message(props) {

  //@ts-ignore
  const [user] = useContext(UserContext);
  const lastMessage = props.message;

  const navigation = useNavigation();

  const lastSender = (user.email == props.message.lastSender) ? 'Tu' : props.message.name;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.touchOpacity} 
        onPress={() => navigation.navigate('Chat', { otherUserEmail: lastMessage.conversationWith})
      }>
      <ListItem
        leftAvatar={{
          title: getInitials(lastMessage.name)
        }}
        title={lastMessage.name}
        subtitle={lastMessage.message}
      />
      </TouchableOpacity>
      
    </View> 
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'stretch',
  },
  touchOpacity: {
    height: 70,
    width: 400
  },
  messageBar: {
    flex: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 50
  },
  textBar: {
    flex: 8,
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    flexDirection: 'row'
  },
  receiverName: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
  },
  textPreview: {
    flex: 8,
    flexDirection: 'row'
  },
  avatar: {
    flex: 2,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
});
