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
    const priceRegExp: RegExp = /^[+0-9]+\.?[+ 0-9]{1,2}$/;
    return priceRegExp.test(value);
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

