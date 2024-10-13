const isSameDay = require('../isSameDay');

describe('isSameDay function', () => {
  it('should return true for same dates but different date formats', () => {
    const result = isSameDay(1728826148838, 'Sun Oct 13 2024 06:28:05 GMT-0700 (Pacific Daylight Time)');
    expect(result).toBe(true);
  });

  it('should return true for same dates but different times', () => {
    const resultNoTime = isSameDay('October 13, 2024', 'Sun Oct 13 2024 06:28:05 GMT-0700 (Pacific Daylight Time)');
    const resultDiffTime = isSameDay('Sun Oct 13 2024 06:28:05 GMT-0700 (Pacific Daylight Time)', 'Sun Oct 13 2024 09:34:17 GMT-0700 (Pacific Daylight Time)');
    expect(resultNoTime).toBe(true);
    expect(resultDiffTime).toBe(true);
  });

  it('should return false for different days', () => {
    const result = isSameDay(new Date(), 'Sun Oct 11 2024 06:28:05 GMT-0700 (Pacific Daylight Time)');
    expect(result).toBe(false);
  });
})