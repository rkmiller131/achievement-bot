// module.exports = function isTimestampInWindow(timestamp, startTime, endTime) {
//   // converting into Date object to manipulate and compare times
//   const date = new Date(timestamp);

//   // get the difference in minutes between the UTC and the local time (ahead or behind utc standard)
//   const localOffset = date.getTimezoneOffset();
//   // use the local offset to adjust the date to reflect the local timezone offset.
//   // This adjusts the date to represent the exact moment in the user's local timezone.
//   // negative localOffsets mean ahead and positives mean behind UTC (kinda counterintuitive), so subtract
//   date.setMinutes(date.getMinutes() - localOffset);

//   // redefine the start and end times. Since we only care about the time in milliseconds (getTime()),
//   // rest of the date can be generic epoch of today's date, with that localOffset adjustment
//   const start = new Date(timestamp);
//   start.setHours(startTime, 0 - localOffset, 0);
//   const end = new Date(timestamp);
//   end.setHours(endTime, 0 - localOffset, 0);

//   // check if the timestamp falls within the time frame (returning true or false)
//   return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
// }

module.exports = function isTimestampInWindow(timestamp, startTime, endTime) {
  // Discord timestamps are ISO 8601 timestamp. new Date internally uses UTC but once you call toString or getHours,
  // it gets converted to local time (so no need to get the offset)
  const date = new Date(timestamp);

  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startTime, 0, 0);
  const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endTime, 0, 0);

  return date >= startDate && date <= endDate;
}