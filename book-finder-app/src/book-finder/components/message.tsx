import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'react-navigation-hooks';


export default function Message(props) {

  const [userID, setUserID] = useState(3);

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch',}}>
      <TouchableOpacity onPress={() => navigation.navigate('Chat', {})}>
        {
          (userID == props.sender) ?
              <Text>Io: </Text>
          : 
              <Text>Altro: </Text> 
      } 
      <Text>{props.message} </Text>
      </TouchableOpacity>
    </View> 
  );
  
}
