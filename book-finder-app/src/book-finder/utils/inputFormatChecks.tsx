/*** NoSQL Injection Prevention ****/

// The sanitize function will strip out any keys that start with '$' in the input,
// so you can pass it to MongoDB without worrying about malicious users overwriting
// query selectors.
const sanitize = require('mongo-sanitize');

// The deepSanitize will check each nested element of an object to see if it is sanitized or less. 
const deepSanitize = (value) => {
    if(Array.isArray(value)){
        value.forEach(elm=>deepSanitize(elm))
    }
    if(typeof(value) === 'object' && value !== null){
        Object.values(value).forEach((elm)=>{
            deepSanitize(elm)
        })
    }
    return sanitize(value)
}

// Check if the string '--' is contained in the value. If so, a NoSQL attack might be happening. 
export const doesntContainsComments = (value) => {
    const regComments: RegExp = /^((?!(--)).)*$/;
    return regComments.test(value);
}

// Checks if the value is free from NoSQL injection and sanitizes it by minimizing the risk of an attack.
export const makeNoSQLInjectionFree = value => {
    if(!doesntContainsComments(value)) 
        return -1;
    return deepSanitize(value);
}



/***** Format Input Checks With Regular Expressions  *****/

export const isAllDigits = (value) => {
    const regexpNumber: RegExp = /^[0-9]*$/;
    return regexpNumber.test(value);
}

export const isAValidPrice = value => {
    const numericalValue = parseFloat(value);
    return numericalValue != NaN && numericalValue > 0.0;
}

export const isThirteenDigits = (value) => {
    const regexpNumber: RegExp = /^[+ 0-9]{13}$/;
    return regexpNumber.test(value);
}

export const isISBN = (value) => {
    return isAllDigits(value) && isThirteenDigits(value);
}

export const isValidEmail = (emailAddress) => {
    const regexpEmail: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regexpEmail.test(emailAddress);
}

export const isNotEmpty = (value) => {
    return value.length > 0;
}

export const convertIntoRealPrice = value => {
    return parseFloat(value).toFixed(2).toString();
}

export const isSignupPageValid = (email, firstname, lastname, password1, password2, birthdate, faculty, university) => {
    return (isNotEmpty(email) && isNotEmpty(firstname) && isNotEmpty(lastname) && isNotEmpty(password1) && isNotEmpty(password2)
            && isNotEmpty(birthdate) && isNotEmpty(faculty) && isNotEmpty(university));
}

export const isWishListBookValid = (title, author, editor, isbn) => {
    return (isNotEmpty(title) && isNotEmpty(author) && isNotEmpty(editor) && isNotEmpty(isbn) && isISBN(isbn));
}

export const isValidNewBook =(title, author, editor, isbn, price) => {
    return isWishListBookValid(title, author, editor, isbn) && isAValidPrice(price);
}

export const isSearchValid = (title, author, editor, isbn) => {
    return isWishListBookValid(title, author, editor, isbn);
}

export const areSettingsValid = (firstname, lastname, birthdate, university, faculty) => {
    console.log("in are settings valid")
    console.log(firstname)
    console.log(lastname)
    console.log(birthdate)
    console.log(university)
    console.log(faculty)
    return isNotEmpty(firstname) && isNotEmpty(lastname) && isNotEmpty(birthdate) && isNotEmpty(faculty) && isNotEmpty(university);
}