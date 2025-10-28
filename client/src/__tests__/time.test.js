import { formatTime } from '../utils/time';

describe('formatTime', () => {
    test('formats time correctly', () => {
        expect(formatTime(60)).toBe('1:00');
        expect(formatTime(90)).toBe('1:30');
        expect(formatTime(45)).toBe('0:45');
        expect(formatTime(0)).toBe('0:00');
        expect(formatTime(5)).toBe('0:05');
    });
});
        