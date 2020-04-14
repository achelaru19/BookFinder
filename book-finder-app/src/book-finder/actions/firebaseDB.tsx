import firebaseSDK from './firebaseSDK';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebaseSDK.getFirebase().firestore();


export async function getSellingBooks(email, callback_function) {
    db.collection('books')
        .where('sellerEmail', '==', email)
        .get()
        .then((snapshot) => {
            let books = [];
            snapshot.forEach((doc) => {
                books.push(doc.data());
            });
            callback_function(books);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
};

export function searchBook(user, title, author, editor, isbn, callback_function) {
    let books = [];
    db.collection('books')
    .where('title', '==', title)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerUniversity == user.university)
                books.push(book);
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    db.collection('books')
    .where('author', '==', author)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerUniversity == user.university)
                books.push(book);
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    db.collection('books')
    .where('editor', '==', editor)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerUniversity == user.university)
                books.push(book);
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    db.collection('books')
    .where('isbn', '==', isbn)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerUniversity == user.university)
                books.push(book);
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    callback_function(books);
}

export async function getBooksAroundUser(user, setBooks){
    // TO BE DEFINED
    db.collection('books')
    .orderBy('inputTime')
    .get()
    .then((snapshot) => {
        console.log("in db books around me")
        let books = [];
        console.log(user);
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerEmail != user.email && book.sellerUniversity == user.university){
                console.log(book)
                books.push(book);
            }
        });
        setBooks(books);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export function getUser(email, callback_function) {
    db.collection('users')
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log("data");
            const userReturned = doc.data();
            console.log(userReturned);
            callback_function(userReturned);
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

export async function updateUser(email, firstname, lastname, birthdate, university, faculty) {
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

export async function addBook(user, title, author, isbn, editor, price) {
    let docRef = db.collection('books').doc();
    let now = new Date(Date.now());
    let newBook = docRef.set({
        title: title,
        author: author,
        isbn: isbn,
        editor: editor,
        price: price,
        inputTime: now.toISOString(),
        sold: false,
        sellerName: user.firstname + ' ' + user.lastname,
        sellerEmail: user.email,
        sellerUniversity: user.university,
        sellerFaculty: user.faculty
    });
};

export async function addBookToWishList(email, title, author, isbn, editor) {
    let docRef = db.collection('wishlist').doc();

    let newWishBook = docRef.set({
        title: title,
        author: author,
        isbn: isbn,
        editor: editor,
        email: email
    });
};

export async function getWishList(email, callback_function) {
    db.collection('wishlist')
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
        let books = [];
        snapshot.forEach((doc) => {
            books.push(doc.data());
        });
        if (books.length == 0) callback_function([]);
        else callback_function(books);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export async function removeFromWishList(email, title, author, editor, isbn) {
    
    db.collection('wishlist')
    .where('email', '==', email)
    .where('title', '==', title)
    .where('author', '==', author)
    .where('editor', '==', editor)
    .where('isbn', '==', isbn)
    .limit(1)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            db.collection('wishlist').doc(doc.id).delete();
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}
