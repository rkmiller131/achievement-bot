const isTimestampInWindow = require('../isTimestampInWindow');

describe(('Timestamp in Window Check'), () => {
  it('should correctly return true if timstamp is in window', () => {
    const result = isTimestampInWindow(1729421534096, 2, 4);
    expect(result).toBeTruthy();
  });

  it('returns true for timestamp exactly at the end time', () => {
    const timestamp = new Date('2024-08-18T13:00:00').getTime();
    const result = isTimestampInWindow(timestamp, 10, 13);
    expect(result).toBeTruthy();
  });

  it('should correctly return false if timstamp is outside window', () => {
    const result = isTimestampInWindow(1724005057726, 2, 4);
    expect(result).not.toBeTruthy();
  });

  it('should return false for incorrectly formatted start and end time arguments', () => {
    const incorrectCall1 = isTimestampInWindow(1724005057726, '10AM', '1PM');
    const incorrectCall2 = isTimestampInWindow(1724005057726, '10:00', '1:00');
    expect(incorrectCall1).not.toBeTruthy();
    expect(incorrectCall2).not.toBeTruthy();
  });
})