import firebase from 'firebase';
import {Permissions, Notifications} from 'expo';
import {TOKEN_GOOGLE_BOOKS} from '../consts/constants';

export const getInitials = (fullname) => {
    const name: string[] = fullname.split(" ");
    let initials: string = '';
    for(let i = 0; i < name.length; i++){
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

export const mergeEmails = (email1, email2) => {
    if(email1 > email2)
        return email2 + '_' + email1;
    else 
        return email1 + '_' + email2;
}

export async function searchBookDetails(isbn, setISBN, pressCamera, setScanned, setTitle, setEditor, setAuthor) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=" + TOKEN_GOOGLE_BOOKS;
    fetch(url)
    .then(response => response.text())
    .then((response) => {
        const json = JSON.parse(response)
        const items = json["items"]
        const fisrtElement = items[0];
        const volumeInfo = fisrtElement["volumeInfo"]
        const title = volumeInfo['title'];
        const publisher = volumeInfo['publisher']
        const authors = volumeInfo['authors'];
        let authorString = ''
        const len = authors.length;
        for(let i = 0; i < len; i++){
        if(i != 0)
            authorString = authorString + ', ' + authors[i];
        else
            authorString = authors[i];
        }
        if(title != undefined) setTitle(title);
        if(authors != undefined) setAuthor(authorString);
        if(publisher != undefined) setEditor(publisher);
        setISBN(isbn);
        pressCamera();
        setScanned(true);
    }).catch((err) => {
        console.log('fetch', err)
    })
}


/*
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
*/