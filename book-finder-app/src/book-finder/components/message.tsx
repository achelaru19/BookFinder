import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';
import { ListItem } from 'react-native-elements';
import { getInitials, shortenMessageIfTooLong } from '../utils/functions';
import { LastMessageType } from '../types/lastMessageType';
import { SafeAreaView } from 'react-navigation';

interface PropsType {
  message: LastMessageType;
  changeLastMessage: () => void;
  key: string;
}

export default function Message(props: PropsType) {
  
  const lastMessage = props.message;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView> 
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
        </ScrollView>
      </SafeAreaView>
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
    width: Math.round(Dimensions.get('window').width)
  },
  messageBar: {
    flex: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 60
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
