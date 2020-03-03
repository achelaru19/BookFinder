import firebaseSDK from './firebaseSDK';

const db = firebaseSDK.getFirestore();


export async function getUsers() {
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

export async function getUser(email) {
    db.collection('users')
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export function addBook() {
    let docRef = db.collection('users').doc('alovelace');

    let setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
    });
};
