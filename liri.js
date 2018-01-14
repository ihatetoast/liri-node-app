require("dotenv").config();

//3rd party:
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const Table = require('cli-table');
//own
const keys = require('./keys');
const commands = require('./commands');


const client = new Twitter(keys.twitter);

// 
//try yargs?
//use help to list command titles, command 
const argv = yargs.argv;
const command = process.argv[2];
//capture 4th input which will be either
const title = process.argv[3];

const tweetTable = new Table({
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  style: { 'padding-left': 0, 'padding-right': 0 }
});


/***************************
DO WHAT IT SAYS
*****************************/

//INSTRUCTIONS//
// node liri.js do-what-it-says

const doWhatItSays =() => { 
  console.clear();
  console.log('do what it said fired');
}



switch (command) {
  case 'my-tweets':
    console.clear();
    commands.myTweets();
    break;
  case 'spotify-this-song':
    console.clear();
    commands.spotifyThisSong(title);
    break;
  case 'movie-this':
    console.clear();
    commands.movieThis(title)
    break;
  case 'do-what-it-says':
    console.clear();
    commands.randomCommandom();
    break;
  default:
    console.clear();
    console.log(`Sorry, I do not recognise ${command}. Please choose from the following: my-tweets, spotify-this-song, movie-this, or do-what-this-says`);
}


