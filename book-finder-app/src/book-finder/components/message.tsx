import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { UserContext } from '../consts/context';
import { ListItem, Icon } from 'react-native-elements';
import { getInitials, shortenMessageIfTooLong } from '../utils/functions';
import { UserType } from '../types/userType';
import { LastMessageType } from '../types/lastMessageType';

interface PropsType {
  message: LastMessageType;
  changeLastMessage: () => void;
  key: string;
}

export default function Message(props: PropsType) {
  //@ts-ignore
  const [user] = useContext<UserType>(UserContext);
  const lastMessage = props.message;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.touchOpacity} 
        onPress={() => navigation.navigate('Chat', { otherUserEmail: lastMessage.conversationWith})
      }>
        { lastMessage.read ?
          <ListItem
            leftAvatar={{
              title: getInitials(lastMessage.name)
            }}
            title={lastMessage.name}
            subtitle={shortenMessageIfTooLong(lastMessage.message)}
          /> 
          :
          <ListItem
            leftAvatar={{
              title: getInitials(lastMessage.name)
            }}
            title={lastMessage.name}
            subtitle={shortenMessageIfTooLong(lastMessage.message)}
            rightIcon={{ name: 'circle', type: 'font-awesome', color: '#90001F'}}
          /> 
        }
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
