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


exports.createUser = functions.firestore
    .document('books/{bookID}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      //const newValue = snap.data();

      // access a particular field as you would any JS property
      //const name = newValue.name;

      // perform desired operations ...
    });
