module.exports = function isTimestampInWindow(timestamp, startTime, endTime) {
  // Discord timestamps are ISO 8601 timestamp. new Date internally uses UTC but once you call toString or getHours,
  // it gets converted to local time (so no need to get the offset)
  // Example timestamp: 1729421534096
  const date = new Date(timestamp);

  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startTime, 0, 0);
  const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTime, 0, 0);

  return date >= startDate && date <= endDate;
}