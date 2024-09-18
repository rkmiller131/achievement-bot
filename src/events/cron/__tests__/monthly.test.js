const monthlyCron = require('../monthly');

describe('Monthly Cron Scheduler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should correctly calculate the previous delete months and years based on a current date', async () => {
    const mockDate = {
      getMonth: () => 8,
      getFullYear: () => 2024,
    };

    jest.spyOn(Date.prototype, 'getMonth').mockImplementationOnce(mockDate.getMonth);
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementationOnce(mockDate.getFullYear);

    const { prevMonth, prevYear, deleteMonth, deleteYear } = await monthlyCron();

    expect(prevMonth).toBe(7);
    expect(prevYear).toBe(2024);
    expect(deleteMonth).toBe(6);
    expect(deleteYear).toBe(2024);
  });

  it('should handle edge cases of January for prev and delete months and years', async () => {
    const mockDate = {
      getMonth: () => 0,
      getFullYear: () => 2025,
    };

    jest.spyOn(Date.prototype, 'getMonth').mockImplementationOnce(mockDate.getMonth);
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementationOnce(mockDate.getFullYear);

    const { prevMonth, prevYear, deleteMonth, deleteYear } = await monthlyCron();

    expect(prevMonth).toBe(11);
    expect(prevYear).toBe(2024);
    expect(deleteMonth).toBe(10);
    expect(deleteYear).toBe(2024);
  });

  it('should handle edge case of February for delete month and year', async () => {
    const mockDate = {
      getMonth: () => 1,
      getFullYear: () => 2025,
    };

    jest.spyOn(Date.prototype, 'getMonth').mockImplementationOnce(mockDate.getMonth);
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementationOnce(mockDate.getFullYear);

    const { prevMonth, prevYear, deleteMonth, deleteYear } = await monthlyCron();

    expect(deleteMonth).toBe(11);
    expect(deleteYear).toBe(2024);
  });
})