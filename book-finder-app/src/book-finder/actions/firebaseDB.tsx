import firebaseSDK from './firebaseSDK';

const db = firebaseSDK.getFirestore();


export function getBook() {
    db.collection('users')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
};



export function addBook() {
    let docRef = db.collection('users').doc('alovelace');

    let setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
    });
};
