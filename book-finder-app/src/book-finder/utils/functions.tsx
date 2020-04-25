import firebase from 'firebase';
import {Permissions, Notifications} from 'expo';

export const getInitials = (fullname: string) => {
    const name: string[] = fullname.split(" ");
    let initials: string = '';
    for(let i = 0; i < name.length; i++){
        console.log(name[i])
        const initial = name[i].charAt(0);
        initials = initials+initial;
    };

    return initials;
}

export const logout = async () => {
    console.log("LOGOUT")
    try {
        firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
} 

const shortenWord = (word, maxLength) => {
    return (word.length > maxLength) ? word.substring(0, maxLength-3) + "..." : word;
}

export const shortenNameIfTooLong = (name) => {
    return shortenWord(name, 25);
}

export const shortenMessageIfTooLong = (message) => {
    return shortenWord(message, 45);
}

export async function registerForPushNotificationsAsync(){
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    if(status !== 'granted') {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    if(finalStatus !== 'granted') {
        return;
    }

    let toker = await Notifications.getExpoPushTokenAsync();

    // save token in user 

}