import firebaseSDK from './firebaseSDK';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebaseSDK.getFirebase().firestore();

const mergeEmails = (email1, email2) => {
    if(email1 > email2)
        return email2 + '_' + email1;
    else 
        return email1 + '_' + email2;
}

export function setLastMessageRead(sender, receiver){
    const senderRef = db.collection('last_messages').doc(sender).collection('messages').doc(receiver);
    if(senderRef != undefined)
        senderRef.update({
            read: true
        });
}

// Use their user data structures and not their emails
export async function addMessage(sender, receiver, message){
    const combinedEmail = mergeEmails(sender.email, receiver.email);
    db.collection('messages')
        .doc(combinedEmail)
        .collection('messages')
        .doc()
        .set({message: message});       
}

export async function updateLastMessage(sender, receiver, message){
    const now = new Date(Date.now());
    db.collection('last_messages')
    .doc(sender.email)
    .collection('messages')
    .doc(receiver.email)
    .set({
        conversationWith: receiver.email,
        lastSender: sender.email,
        name: receiver.firstname + ' ' + receiver.lastname, 
        read: true,
        timestamp: now.toISOString(),
        message: message
    });
    
    db.collection('last_messages')
    .doc(receiver.email)
    .collection('messages')
    .doc(sender.email)
    .set({
        conversationWith: sender.email,
        lastSender: sender.email,
        name: sender.firstname + ' ' + sender.lastname, 
        read: false,
        timestamp: now.toISOString(),
        message: message
    });
}

export function getLastMessages(email, setLastMessages) {
    db.collection('last_messages')
    .doc(email)
    .collection("messages")
    .get()
    .then((snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        console.log(messages);
        setLastMessages(messages);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export function getMessages(sender, receiver, setMessages) {
    let emailsCombination = mergeEmails(sender, receiver);
    console.log(emailsCombination)
    db.collection('messages')
    .doc(emailsCombination)
    .collection('messages')
    .get()
    .then((snapshot) => {
        let messages = [];
        console.log("inside getMessages")
        snapshot.forEach((doc) => {
            const message = doc.data().message;
            console.log(message)
            let gcm = {
                _id: message._id,
                text: message.text,
                createdAt: new Date(message.createdAt.seconds * 1000).toISOString(),
                user: {
                  _id: message.user._id,
                  name: message.user.name,
                }
              };
              console.log(gcm)
            const messageCmposed = {
                message,
                user: {
                    _id: sender,
                }
            }
            messages.push(gcm);
            console.log(doc.data());
        });
        console.log("FUORI FOREACH")
        console.log(messages)
        setMessages(messages);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

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

export async function searchBook(user, title, author, editor, isbn, callback_function) {
    let books = new Set();
    console.log("inside book function")
    console.log(user)
    await db.collection('books')
    .where('title', '==', title)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            console.log(book)
            if(book.sellerUniversity == user.university){
                if(!books.has(book)){
                    books.add(book);
                }
            }
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    await db.collection('books')
    .where('author', '==', author)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerUniversity == user.university){
                if(!books.has(book)){
                    books.add(book);
                }
            }
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    await db.collection('books')
    .where('editor', '==', editor)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerUniversity == user.university){
                if(!books.has(book)){
                    books.add(book);
                }
            }
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    await db.collection('books')
    .where('isbn', '==', isbn)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerUniversity == user.university){
                if(!books.has(book)){
                    books.add(book);
                }
            }
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    const booksArray = Array.from(books);
    console.log(booksArray);
    callback_function(booksArray);
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
    let now = new Date(Date.now());
    db.collection('books').doc().set({
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
