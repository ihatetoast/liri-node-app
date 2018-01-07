require("dotenv").config();
const keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

const command = process.argv[2];

//INSTRUCTIONS//
// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
//capture the argument vectors of the command (my-tweets etc)
//f(x) to ret 20 and when sent

//use switch for commands after f(x) built
// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says

switch (command) {
  case 'my-tweets':
    console.log('my tweets fired');
    break;
  case 'spotify-this-song':
    console.log('spotified fired.');
    break;
  case 'movie-this':
    console.log('movie this.');
    break;
  case 'do-what-it-says':
    console.log('do what it says.');
    break;
  default:
    console.log(`Sorry, I do not recognise ${command}. Please choose from the following: my-tweets, spotify-this-song, movie-this, or do-what-this-says`);
}


