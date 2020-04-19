
import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import NavBar from '../components/navBar';
import { View, Text } from 'react-native';
import { UserContext } from '../consts/context';
import { useNavigation } from 'react-navigation-hooks';
import { getUser, getMessages, addMessage, setLastMessageRead, updateLastMessage } from '../actions/firebaseDB';
import { AppLoading } from 'expo';
import { loadResourcesAsync, handleLoadingError, handleFinishLoading } from '../utils/fontLoader';

export default function Chat() {
    const navigation  = useNavigation();

    const otherUserEmail = navigation.getParam('otherUserEmail');
    const [messages, setMessages] = useState([]);
    const [fontLoaded, setFontLoaded] = useState(false);
    //@ts-ignore
    const [user] = useContext(UserContext);
    const [otherUser, setOtherUser] = useState(null);
    const [isOtherUserSet, setOtherUserFlag] = useState(false);

    const onSend = (chatMessage) => {
        console.log("NEW MESS")
        console.log(chatMessage[0])
        console.log("ALL MESS")
        console.log(messages);
        addMessage(user, otherUser, chatMessage[0]);
        updateLastMessage(user, otherUser, chatMessage[0].text); 
        setMessages(GiftedChat.append(messages, chatMessage));
    };


    useEffect(() => {
        console.log(otherUserEmail);
        getUser(otherUserEmail, (u) => setOtherUser(u));
        getMessages(user.email, otherUserEmail, messages => setMessages(messages));
        setLastMessageRead(user.email, otherUserEmail);
    }, [otherUserEmail])


    if(otherUser == null)
        return (
            /*<AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setFontLoaded)} 
            />*/
            <View style={{flex: 1}}>
                    <Text>W AITING</Text>
            </View> 
            );
    else {
        return (
        <View style={{flex: 1}}>
            <NavBar title={otherUser.firstname + ' ' + otherUser.lastname}/>
 
            <GiftedChat 
                messages={messages}
                onSend={c => onSend(c)}
                user={{
                    _id: user.email,
                    name: user.firstname + ' ' + user.lastname
                }}
                placeholder={"Scrivi un messaggio..."}
                key={user.email}
            />
        </View>
        );
    }
}

Chat.navigationOptions = ({ navigation }) => ({
    title: 'Chat',
    drawerLabel: () => null
});