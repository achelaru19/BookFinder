/* global it, expect */
import * as actions from '../utils/functions';

describe('Tests on getInitials function', () => {
    it('returns AC with Angel Chelaru', () => {
        expect(actions.getInitials('Angel Chelaru')).toBe('AC');
    });

    it('returns MVR with Marco Verdi Rossi', () => {
        expect(actions.getInitials('Marco Verdi Rossi')).toBe("MVR");
    });

    it('returns U with Uniconometuttointero', () => {
        expect(actions.getInitials('Uniconometuttointero50')).toBe("U");
    });
    
    it('returns SAF with " Space And After "', () => {
        expect(actions.getInitials(' Space And After ')).toBe("SAA");
    });
});

describe('Tests on shortenNameIfTooLong function', () => {
    it('returns the same string with its length being less than 25 chars', () => {
        expect(actions.shortenNameIfTooLong('Angel Chelaru')).toBe('Angel Chelaru');
    });

    it('returns the same string since its length is exactly 25 chars', () => {
        expect(actions.shortenNameIfTooLong('Amadeo Della Ghellardesca')).toBe('Amadeo Della Ghellardesca');
    });

    it('returns the first 22 chars plus "..."', () => {
        expect(actions.shortenNameIfTooLong('Amadeo Verdi Della Ghelasdesca')).toBe("Amadeo Verdi Della Ghe...");
    });
});

describe('Tests on shortenMessageIfTooLong function', () => {
    it('returns the same string with its length being less than 45 chars', () => {
        expect(actions.shortenMessageIfTooLong('This is a sample text.')).toBe('This is a sample text.');
    });

    it('returns the same string since its length is exactly 45 chars', () => {
        expect(actions.shortenMessageIfTooLong('This is a sample text.Its length is 45 chars.')).toBe('This is a sample text.Its length is 45 chars.');
    });

    it('returns the first 42 chars plus "..."', () => {
        expect(actions.shortenMessageIfTooLong('This is a sample text.Its length is more than 45 characters long.')).toBe("This is a sample text.Its length is more t...");
    });
});