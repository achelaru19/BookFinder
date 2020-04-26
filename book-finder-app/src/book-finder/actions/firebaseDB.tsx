import firebaseSDK from './firebaseSDK';
import { mergeEmails } from '../utils/functions';
import { makeNoSQLInjectionFree } from '../utils/inputFormatChecks';

const db = firebaseSDK.getFirebase().firestore();

export function setLastMessageRead(inputSender, inputReceiver){
    const sender = makeNoSQLInjectionFree(inputSender);
    const receiver = makeNoSQLInjectionFree(inputReceiver);
    
    const senderRef = db.collection('last_messages').doc(sender).collection('messages').doc(receiver);
    if(senderRef != undefined)
        senderRef.update({
            read: true
        });
}

// Use their user data structures and not their emails
export async function addMessage(inputSender, inputReceiver, inputMessage){
    const sender = makeNoSQLInjectionFree(inputSender);
    const receiver = makeNoSQLInjectionFree(inputReceiver);
    const message = makeNoSQLInjectionFree(inputMessage);

    const combinedEmail = mergeEmails(sender.email, receiver.email);

    db.collection('messages')
        .doc(combinedEmail)
        .collection('messages')
        .doc()
        .set({message: message});       
}

export async function updateLastMessage(inputSender, inputReceiver, inputMessage){
    const sender = makeNoSQLInjectionFree(inputSender);
    const receiver = makeNoSQLInjectionFree(inputReceiver);
    const message = makeNoSQLInjectionFree(inputMessage);

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

export function getLastMessages(inputEmail, setLastMessages) {
    const email = makeNoSQLInjectionFree(inputEmail);

    db.collection('last_messages')
    .doc(email)
    .collection("messages")
    .get()
    .then((snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        setLastMessages(messages);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export function getMessages(inputSender, inputReceiver, setMessages) {
    const sender = makeNoSQLInjectionFree(inputSender);
    const receiver = makeNoSQLInjectionFree(inputReceiver);

    const emailsCombination = mergeEmails(sender, receiver);

    db.collection('messages')
    .doc(emailsCombination)
    .collection('messages')
    .get()
    .then((snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
            const message = doc.data().message;
            const gcm = {
                _id: message._id,
                text: message.text,
                createdAt: new Date(message.createdAt.seconds * 1000).toISOString(),
                user: {
                  _id: message.user._id,
                  name: message.user.name,
                }
              };
            messages.push(gcm);
        });
        setMessages(messages.sort((a, b) => { return b.createdAt.localeCompare(a.createdAt)}));
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export async function getSellingBooks(inputEmail, callback_function) {
    const email = makeNoSQLInjectionFree(inputEmail);

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

export async function searchBook(inputUser, inputTitle, inputAuthor, inputEditor, inputISBN, callback_function) {
    const user = makeNoSQLInjectionFree(inputUser);
    const title = makeNoSQLInjectionFree(inputTitle);
    const author = makeNoSQLInjectionFree(inputAuthor);
    const editor = makeNoSQLInjectionFree(inputEditor);
    const isbn = makeNoSQLInjectionFree(inputISBN);

    let books = new Set();

    await db.collection('books')
    .where('title', '==', title)
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
    callback_function(booksArray);
}

export async function getBooksAroundUser(user, setBooks){
    db.collection('books')
    .orderBy('inputTime')
    .get()
    .then((snapshot) => {
        console.log("in db books around me")
        let books = [];
        snapshot.forEach((doc) => {
            const book = doc.data();
            if(book.sellerEmail != user.email && book.sellerUniversity == user.university){
                books.push(book);
            }
        });
        setBooks(books);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export function getUser(inputEmail, callback_function) {
    const email = makeNoSQLInjectionFree(inputEmail);

    db.collection('users')
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            const userReturned = doc.data();
            callback_function(userReturned);
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
}

export async function addUser(inputEmail, inputFirstname, inputLastname, inputBirthdate, inputUniversity, inputFaculty) {
    const email = makeNoSQLInjectionFree(inputEmail);
    const firstname = makeNoSQLInjectionFree(inputFirstname);
    const lastname = makeNoSQLInjectionFree(inputLastname);
    const birthdate = makeNoSQLInjectionFree(inputBirthdate);
    const university = makeNoSQLInjectionFree(inputUniversity);
    const faculty = makeNoSQLInjectionFree(inputFaculty);

    db.collection('users')
    .doc(email)
    .set({
        email: email,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        university: university,
        faculty: faculty
    });
}

export async function updateUser(inputEmail, inputFirstname, inputLastname, inputBirthdate, inputUniversity, inputFaculty) {
    const email = makeNoSQLInjectionFree(inputEmail);
    const firstname = makeNoSQLInjectionFree(inputFirstname);
    const lastname = makeNoSQLInjectionFree(inputLastname);
    const birthdate = makeNoSQLInjectionFree(inputBirthdate);
    const university = makeNoSQLInjectionFree(inputUniversity);
    const faculty = makeNoSQLInjectionFree(inputFaculty);

    db.collection('users')
    .doc(email)
    .set({
        email: email,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        university: university,
        faculty: faculty
    });
}

export async function addBook(inputUser, inputTitle, inputAuthor, inputISBN, inputEditor, inputPrice) {
    const user = makeNoSQLInjectionFree(inputUser);
    const title = makeNoSQLInjectionFree(inputTitle);
    const author = makeNoSQLInjectionFree(inputAuthor);
    const editor = makeNoSQLInjectionFree(inputEditor);
    const isbn = makeNoSQLInjectionFree(inputISBN);
    const price = makeNoSQLInjectionFree(inputPrice);

    let now = new Date(Date.now());
    db.collection('books')
    .doc()
    .set({
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

export async function addBookToWishList(inputEmail, inputTitle, inputAuthor, inputISBN, inputEditor) {
    const email = makeNoSQLInjectionFree(inputEmail);
    const title = makeNoSQLInjectionFree(inputTitle);
    const author = makeNoSQLInjectionFree(inputAuthor);
    const editor = makeNoSQLInjectionFree(inputEditor);
    const isbn = makeNoSQLInjectionFree(inputISBN);

    db.collection('wishlist')
    .doc()
    .set({
        title: title,
        author: author,
        isbn: isbn,
        editor: editor,
        email: email
    });
};

export async function getWishList(inputEmail, callback_function) {
    const email = makeNoSQLInjectionFree(inputEmail);
    
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

export async function removeFromWishList(inputEmail, inputTitle, inputAuthor, inputEditor, inputISBN) {
    const email = makeNoSQLInjectionFree(inputEmail);
    const title = makeNoSQLInjectionFree(inputTitle);
    const author = makeNoSQLInjectionFree(inputAuthor);
    const editor = makeNoSQLInjectionFree(inputEditor);
    const isbn = makeNoSQLInjectionFree(inputISBN);

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
