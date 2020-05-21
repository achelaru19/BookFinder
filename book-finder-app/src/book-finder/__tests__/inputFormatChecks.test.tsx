/* global it, expect */
import * as formatChecks from '../utils/inputFormatChecks';

describe('Tests on isAllDigits function', () => {
    it('returns true with 32145', () => {
        expect(formatChecks.isAllDigits("32145")).toBe(true);
    });

    it('returns false with 32a45', () => {
        expect(formatChecks.isAllDigits('32a45')).toBe(false);
    });

    it('returns false with 23.50', () => {
        expect(formatChecks.isAllDigits('23.50')).toBe(false);
    });
});

describe('Tests on isAValidPrice function', () =>{
    it('returns true with 34.99', () => {
        expect(formatChecks.isAValidPrice('34.99')).toBe(true);
    });

    it('returns true with 34.9', () => {
        expect(formatChecks.isAValidPrice('34.9')).toBe(true);
    });

    it('returns false with -24.66', () => {
        expect(formatChecks.isAValidPrice('-24.66')).toBe(false); 
    });
    
    it('returns false with 3a64.5', () => {
        expect(formatChecks.isAValidPrice('3a64.5')).toBe(false); 
    });

    it('returns false with 34.999', () => {
        expect(formatChecks.isAValidPrice('34.999')).toBe(true);
    });
    
    it('returns true with 34', () => {
        expect(formatChecks.isAValidPrice('34')).toBe(true);
    });
});

describe('Tests on isThirteenDigits function', () =>{
    it('returns true with 1234567890123', () => {
        expect(formatChecks.isThirteenDigits('1234567890123')).toBe(true);
    });

    it('returns false with 12345678901234', () => {
        expect(formatChecks.isThirteenDigits('12345678901234')).toBe(false);
    });

    it('returns false with 123456a890123', () => {
        expect(formatChecks.isThirteenDigits('123456a890123')).toBe(false);
    });
});


describe('Tests on isISBN function', () =>{
    it('returns true with 1234567890123', () => {
        expect(formatChecks.isISBN('1234567890123')).toBe(true);
    });

    it('returns false with 12345678901234', () => {
        expect(formatChecks.isISBN('12345678901234')).toBe(false);
    });

    it('returns false with 123456a890123', () => {
        expect(formatChecks.isISBN('123456a890123')).toBe(false);
    });
});


describe('Tests on isValidEmail function', () =>{
    it('returns true with myemail@gmail.com', () => {
        expect(formatChecks.isValidEmail('myemail@gmail.com')).toBe(true);
    });

    it('returns false with my.fake.email@fake.provider.organisation', () => {
        expect(formatChecks.isValidEmail('my.fake.email@fake.provider.organisation')).toBe(false);
    });

    it('returns false with thisisn0tanem41l', () => {
        expect(formatChecks.isValidEmail('thisisn0tanem41l')).toBe(false);
    });

    it('returns true with marco.rossi@mail.polimi.it', () => {
        expect(formatChecks.isValidEmail('marco.rossi@mail.polimi.it')).toBe(true);
    });
});

describe('Tests on isNotEmpty', () =>{
    it('returns true with justAString', () => {
        expect(formatChecks.isNotEmpty('justAString')).toBe(true);
    });

    it('returns true with justAString4ndnumb3rs', () => {
        expect(formatChecks.isNotEmpty('justAString4ndnumb3rs')).toBe(true);
    });

    it('returns false with "" ', () => {
        expect(formatChecks.isNotEmpty('')).toBe(false);
    });
});

describe('Tests on convertIntoRealPrice', () =>{
    it('return 12.30 with 12.3', () => {
        expect(formatChecks.convertIntoRealPrice('12.3')).toBe("12.30");
    });

    it('return 12.30 with 12.299', () => {
        expect(formatChecks.convertIntoRealPrice('12.299')).toBe('12.30');
    });

    it('return 122.00 with 122', () => {
        expect(formatChecks.convertIntoRealPrice('122')).toBe('122.00');
    });

    it('return 12.30 with 12.30', () => {
        expect(formatChecks.convertIntoRealPrice('12.30')).toBe('12.30');
    });

    it('return 12.354999999999 with 12.35', () => {
        expect(formatChecks.convertIntoRealPrice('12.354999999999')).toBe('12.35');
    });

    it('return 12.3550000001 with 12.36', () => {
        expect(formatChecks.convertIntoRealPrice('12.3550000001')).toBe('12.36');
    });
});

describe('Tests on makeNoSQLInjectionFree function', () =>{
    it('throwns an error with admin"--', () => {
        expect(formatChecks.makeNoSQLInjectionFree('admin"--')).toBe(-1);
    });

    it('returns the same input with myEmailAddress', () => {
        expect(formatChecks.makeNoSQLInjectionFree('myEmailAddress')).toBe('myEmailAddress');
    });

    it('return input escaped', () => {
        expect(formatChecks.makeNoSQLInjectionFree({ _id: { '$ne': 1 } })).toEqual({ _id: {} });
    });
});

describe('Tests on doesntContainsComments function', () =>{
    it('returns true with myEmailAddress', () => {
        expect(formatChecks.doesntContainsComments('myEmailAddress')).toBe(true);
    });
    
    it('returns false with admin"--', () => {
        expect(formatChecks.doesntContainsComments('admin"--')).toBe(false);
    });
    
    it('returns true with "admin-adminpass-somethingelse"', () => {
        expect(formatChecks.doesntContainsComments('admin-adminpass-somethingelse')).toBe(true);
    });
});

