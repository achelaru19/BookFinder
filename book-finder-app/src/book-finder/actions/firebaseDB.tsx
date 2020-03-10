import firebaseSDK from './firebaseSDK';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebaseSDK.getFirebase().firestore();


export async function getSellingBooks(email) {
    db.collection('books')
        .where('emailSeller', '==', email)
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

export async function getBooksAroundUser(email){
    // TO BE DEFINED
    db.collection('books')
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
}

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

export async function addUser(email, firstname, lastname, birthdate, university, faculty) {
    let docRef = db.collection('users').doc(email);

    let newUser = docRef.set({
        email: email,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        university: university,
        faculty: faculty
    });
}


export function addBook(email,  firstname, lastname, title, author, isbn, editor, price) {
    let docRef = db.collection('books').doc(email);

    let newBook = docRef.set({
        title: title,
        author: author,
        isbn: isbn,
        editor: editor,
        price: price,
        inputTime: null,
        sold: false,
        sellerName: firstname + ' ' + lastname,
        sellerEmail: email
    });
};

export async function getWishList(email) {
    db.collection('wishlist')
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
