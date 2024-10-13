module.exports = function isSameDay(date1, date2) {
  const d1 = new Date(typeof date1 === 'number' ? date1 : Date.parse(date1));
  const d2 = new Date(typeof date2 === 'number' ? date2 : Date.parse(date2));

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}