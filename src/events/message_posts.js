// * note: have checks within database (try/catch) on user_achievements table so if they already have an achievment, nothing happens
// * Make a helper function for that achievement check

// * Also note: can make an achievment generator, since these are all embeds, and that generator function will increment user's acheivmenet count
// could pass in achievement name and user id and have the generator check user_achievements and achievements table

// listen for when any message is posted anywhere
  // First, extract the server id from the message in question, save as a ref so that we're saving all info under that server in the collection
  // Try to find the server in the mongo collection, and if it doesn't exist, create an entry for that server.

  // Check if the message author exists in our database and save reference to user and channel (?)
  // If !user:
    // add them to the database, give them First Impressions achievement
    // Increment the user's achievement count

  // set user's reaction streak to 0

  // Check the user's channels_particpated_in array - if not includes current channel name,
    // add channel name to this user's participated channels array
    // if the user's participated channels array length is >= 5,
      // Give this user the Social Butterfly achievement
      // Increment the user's achievment count

  // Check what time the message was posted - between 12AM and 4AM?
    // give this user the Overachiever/night owl achievement
    // Increment the user's acheivement count


  // Put this check at the end of every event:
  // If this user's achievment count is (count of the achievments table - 1)
    // Give this user the Final Boss achievement
    // Increment the user's achievment count



/*
[X] First Impressions
[ ] Gif Gifter
[X] Social Butterfly
[ ] Jabberwocky
[ ] Art Aficionado
[X] Overachiever
[X] Final Boss
*/