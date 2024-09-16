// UPDATE: check out MessageCollector from discord.js

// Have a cron job that, at the end of every month, iterates through all the channels

// For each channel, reverse iterate through all the messages and as long as message posted date is in bounds of current month,
// add a new entry for channel_activity with the associated user_id for that message and date

// Check for top contributor:
// For all the entries in channel_activity for current month, sort by user? userid count somehow in descending?
// Give that user Top Contributor achievment and increment their achievement count

//

// Note: have channel_activity only store the past 3 months or so - at the end of this job, mass delete anything outside of the 3 month keeping window

/*
[ ] Top Contributor
[ ] Daily Diligence
[ ] Final Boss
*/