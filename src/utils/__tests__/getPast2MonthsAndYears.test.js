const getPast2MonthsAndYears = require('../getPast2MonthsAndYears');

describe('Get date info from 2 months ago', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should correctly calculate the previous delete months and years based on a current date', () => {
    const mockDate = {
      getMonth: () => 8,
      getFullYear: () => 2024,
    };

    jest.spyOn(Date.prototype, 'getMonth').mockImplementationOnce(mockDate.getMonth);
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementationOnce(mockDate.getFullYear);

    const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();

    expect(prevMonth).toBe(7);
    expect(prevYear).toBe(2024);
    expect(deleteMonth).toBe(6);
    expect(deleteYear).toBe(2024);
  });

  it('should handle edge cases of January for prev and delete months and years', () => {
    const mockDate = {
      getMonth: () => 0,
      getFullYear: () => 2025,
    };

    jest.spyOn(Date.prototype, 'getMonth').mockImplementationOnce(mockDate.getMonth);
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementationOnce(mockDate.getFullYear);

    const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();

    expect(prevMonth).toBe(11);
    expect(prevYear).toBe(2024);
    expect(deleteMonth).toBe(10);
    expect(deleteYear).toBe(2024);
  });

  it('should handle edge case of February for delete month and year', () => {
    const mockDate = {
      getMonth: () => 1,
      getFullYear: () => 2025,
    };

    jest.spyOn(Date.prototype, 'getMonth').mockImplementationOnce(mockDate.getMonth);
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementationOnce(mockDate.getFullYear);

    const { prevMonth, prevYear, deleteMonth, deleteYear } = getPast2MonthsAndYears();

    expect(deleteMonth).toBe(11);
    expect(deleteYear).toBe(2024);
  });
})