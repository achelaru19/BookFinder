import * as functions from 'firebase-functions';



const admin = require('firebase-admin');

 export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

export const confirmUser = functions.auth.user().onCreate((user) => {
    const docRef = admin.database.collection('users').doc(user.email);

    docRef.set({
        validated: true
    });
});
