import React from 'react';
import { Text, View } from 'react-native';


interface Props {
  sender: number,
  message: string
}

class Message extends React.Component<Props> {

state = {
    userID: 3
}

constructor(props){
  super(props);
}

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch',}}>
         {
            (this.state.userID == this.props.sender) ?
                <Text>Io: </Text>
            : 
                <Text>Altro: </Text> 
        } 
        <Text>{this.props.message} </Text>
      </View> 
    );
  }
}


export default Message;