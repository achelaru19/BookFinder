import React from 'react';
import { Text, View } from 'react-native';


interface Props {
  sender: number,
  message: string
}

class Message extends React.Component<Props> {

constructor(props){
  super(props);
}

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch',}}>
        <Text> Messaggio: {this.props.message} </Text>
      </View> 
    );
  }
}


export default Message;