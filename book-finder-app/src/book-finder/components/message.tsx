import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';


export default function Message(props) {

  //@ts-ignore
  const [user] = useContext(UserContext);

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch',}}>
      <TouchableOpacity style={{height: 20, width: 300}} onPress={() => navigation.navigate('Chat', {otherUserEmail: props.message.conversationWith})}>
        {
          (user.email == props.message.lastSender) ?
            <Text>Tu: {props.message.message}</Text>
          : 
            <Text>{props.message.firstName}: {props.message.message}</Text> 
      } 
      </TouchableOpacity>
      
    </View> 
  );
  
}
