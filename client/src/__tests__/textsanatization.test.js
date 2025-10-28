import { sanatizeText } from '../utils/sanatizeText';

describe('sanatizeText', () => {
    test('remove script tags and content', () => {
        const input = 'Hello <script>alert("bad")</script> World';
        expect(sanatizeText(input)).toBe('Hello  World');
    });

    test('keeps normal text intact', () => {
        const input = 'This is a safe text.';
        expect(sanatizeText(input)).toBe('This is a safe text.');
    });

    test('Handles empty input', () => {
        expect(sanatizeText('')).toBe('');
    });
});