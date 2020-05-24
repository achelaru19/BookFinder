import firebase from 'firebase';
import * as FirebaseValues from '../consts/constants';

class FirebaseSDK {
  
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: FirebaseValues.API_KEY,
        authDomain: FirebaseValues.AUTH_DOMAIN,
        databaseURL: FirebaseValues.DB_URL,
        projectId: FirebaseValues.PROJECT_ID,
        storageBucket: FirebaseValues.STORAGE_BUCKET,
        messagingSenderId: '3'
      });
    }
  }

  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };

  signup = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  }

  resetPassword = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .sendPasswordResetEmail(user.email)
      .then(success_callback)
      .catch(error => {
        const errorMessage = error.includes('at least 6 characters') ? 'La password deve essere lunga almeno 6 caratteri' : 'Email già esistente';
        failed_callback(errorMessage);
      });
  }

  getFirebase = () => firebase;

}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;
