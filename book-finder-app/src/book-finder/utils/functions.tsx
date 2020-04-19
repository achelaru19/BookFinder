import { useNavigation } from "react-navigation-hooks";
import firebase from 'firebase';


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