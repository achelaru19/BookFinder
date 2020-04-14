
import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import NavBar from '../components/navBar';
import { View } from 'react-native';
import { UserContext } from '../consts/context';
import { useNavigation } from 'react-navigation-hooks';
import { getUser } from '../actions/firebaseDB';
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

    const onSend = (newMessage) => {
        console.log(newMessage);
        setMessages(GiftedChat.append(messages, newMessage));
        
        //setMessages(newMessages);
    };

    useEffect(() => {
        console.log(otherUserEmail);
        getUser(otherUserEmail, (u) => setOtherUser(u));
        console.log(otherUser);
    }, [])

    if(otherUser == null)
        return (
            /*<AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setFontLoaded)} 
            />*/
            <View />
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
            />
        </View>
        );
    }
}
