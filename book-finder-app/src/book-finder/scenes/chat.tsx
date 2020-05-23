import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import NavBar from '../components/navBar';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../consts/context';
import { useNavigation } from 'react-navigation-hooks';
import { getUser, getMessages, addMessage, setLastMessageRead, updateLastMessage, connectWithChat } from '../actions/firebaseDB';
import { styles } from '../styles/chatStyle';
import { UserType } from '../types/userType';


export default function Chat() {
    
    const navigation  = useNavigation();

    const otherUserEmail: string = navigation.getParam('otherUserEmail');
    const [messages, setMessages] = useState<IMessage[]>([]);
    //@ts-ignore
    const [user] = useContext<UserType>(UserContext);
    const [otherUser, setOtherUser] = useState<UserType | null>(null);
    
    const onSend = (chatMessage) => {
        addMessage(user, otherUser, chatMessage[0]);
        updateLastMessage(user, otherUser, chatMessage[0].text); 
        updateMessagedInChat(chatMessage);
    };

    const updateMessagedInChat = (newMessage) => {
        setMessages(GiftedChat.append(messages, newMessage));
    }

    useEffect(() => {
        console.log(otherUserEmail);
        getUser(otherUserEmail, (u) => setOtherUser(u));
        getMessages(user.email, otherUserEmail, messages => setMessages(messages));
        setLastMessageRead(user.email, otherUserEmail);
        //connectWithChat(user.email, otherUserEmail, updateMessagedInChat);
    }, [otherUserEmail])

    if(otherUser === null) {
        return (
            <View style={{flex: 1}}>
                <NavBar title={'Chat'}/>
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#90001F" />
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={{flex: 1}}>
                <NavBar title={otherUser.firstname + ' ' + otherUser.lastname}/>
                <View style={{flex: 1}}>
                    <GiftedChat 
                        messages={messages}
                        onSend={c => onSend(c)}
                        user={{
                            _id: user.email,
                            name: user.firstname + ' ' + user.lastname
                        }}
                        placeholder={"Scrivi un messaggio..."}
                        key={user.email}
                        keyboardShouldPersistTaps='never'
                    />
                </View>
            </View>
        );
    }

}

Chat.navigationOptions = ({ navigation }) => ({
    title: 'Chat',
    drawerLabel: () => null
});

