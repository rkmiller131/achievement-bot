module.exports = function getPast2MonthsAndYears() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const deleteMonth = (() => {
    if (currentMonth === 0) {
      return 10;
    } else if (currentMonth === 1) {
      return 11;
    } else {
      return currentMonth - 2;
    }
  })();

  const deleteYear = (currentMonth === 0 || currentMonth === 1) ? currentYear - 1 : currentYear;

  return { prevMonth, prevYear, deleteMonth, deleteYear }
}