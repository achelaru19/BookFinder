import * as functions from 'firebase-functions';


const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


exports.sendPushNotifications = functions.firestore
    .document('books/{bookID}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'title': 'Business 101', 'author': 'Micheal Scott', ...}
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const title = newValue.title;
      const author = newValue.author;
      const isbn = newValue.isbn;
      const university = newValue.sellerUniversity;

      const emails = getUsersEmails(title, author, isbn);
      const tokens = getTokens(emails, university);

      const payload = {
          notification: {
              title: 'Ottime notizie!',
              body: 'Qualcuno ha aggiunto un libro che hai nella tua Wish List!'
          }
      };

      admin.messaging().sendToDevice(tokens, payload); 
});


async function getTokens(emails, university){
    const tokens = [];
    await emails.forEach(email => {
         db.collection('tokens')
        .where('email', '==', email)
        .limit(1)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const tokenData = doc.data()
                if(tokenData.university === university){
                    tokens.push(tokenData.token);
                }
            })
        })
    })
    return tokens;
}

async function getUsersEmails(title, author, isbn) {
    const emails = new Set();
    await db.collection('wishlist')
    .where('title', '==', title)
    .get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            const bookData = doc.data()
            if(!emails.has(bookData.user)){
                emails.add(bookData.user);
            }
        })
    })

    await db.collection('wishlist')
    .where('author', '==', author)
    .get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            const bookData = doc.data()
            if(!emails.has(bookData.user)){
                emails.add(bookData.user);
            }
        })
    })

    await db.collection('wishlist')
    .where('isbn', '==', isbn)
    .get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            const bookData = doc.data()
            if(!emails.has(bookData.user)){
                emails.add(bookData.user);
            }
        })
    })
    return Array.from(emails);
}
