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
const omdb = require('./omdb');
const spotify = require('./spotify');

const client = new Twitter(keys.twitter);

// 
//try yargs?
//use help to list command titles, command 
const argv = yargs.argv;
const command = process.argv[2];
//capture 4th input which will be either
const titleReq = process.argv[3];

const tweetTable = new Table({
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
  style: { 'padding-left': 0, 'padding-right': 0 }
});

/***************************
SPOTIFY THIS SONG
*****************************/

/*
`node liri.js spotify-this-song '<song name here>'`
   * This will show the following information about the song in your terminal/bash window
     * Artist(s) //later loop. use table to display
     * The song's name//user input
     * A preview link of the song from Spotify//const preview
     * The album that the song is from// const album
   * If no song is provided then your program will default to "A town called Malice" by The Jam because ace of base blows.
 */
// const spotifyThisSong = (title) =>{
//   console.clear();
//   spotify.search({ 
//     type: 'track', 
//     query: titleReq || 'A Town Called Malice'
//   }, 
//     function(err, data) {
//       if (err) {
//         return console.log('Error occurred: ' + err);
//       }
//   //v1: return just one. (want to finish all 4 before returning to loop over returned data). 
//   const preview = data.tracks.items[0].preview_url;
//   const artist = data.tracks.items[0].artists[0].name;
//   const album = data.tracks.items[0].artists[0].name;
//   console.log(`artist is ${artist}`);
//   });
// }


/***************************
        MOVIE THIS
*****************************/
// const movieThis = (name) =>{
//   console.clear();
//   const url = `http://www.omdbapi.com/?t=${name || 'the castle'}&apikey=6a1aca9d`
//   request(url, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       const info = JSON.parse(body);
//       movieTable.push (
//         {'Movie Title': info.Title},
//         {'Release Date': info.Year},
//         {'IMDB Rating': info.Ratings[0].Value},
//         {'Rotten Tomatoes Rating': info.Ratings[1].Value},
//         {'Country(ies)': info.Country },
//         {'Language': info.Language},
//         {'Starring': info.Actors},
//         {'Plot': info.Plot},
//       )
//       console.log(movieTable.toString());
//     }
//   });
// }

/***************************
    MY TWEETS
*****************************/

const myTweets = () => {
  console.clear();
  //BLOODY HELL!
  client.get('statuses/user_timeline.json?screen_name=katyannedegraes&count=20', function(error, tweets, response){
    if(error) throw error;
    console.log("THE TWEETS");
    // console.log(typeof tweets);  // returns object  

    for (const tweet in tweets) {
      // console.log(`${parseInt(tweet)+1}) ${tweets[tweet]["text"]} \ncreated at ${tweets[tweet]["created_at"]}`);
      tweetTable.push (
      {'tweet': tweets[tweet]["text"]},
      {'on': tweets[tweet]["created_at"]}
      )
    }
    console.log(tweetTable.toString());



  })
  
}

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
    myTweets();
    console.log('my tweets fired');
    break;
  case 'spotify-this-song':
    spotify.spotifyThisSong(titleReq);
    console.log(`spotifyThisSong fired. and song name is ${titleReq}`);
    break;
  case 'movie-this':
    omdb.movieThis(titleReq)
    console.log(`movieThis is fired. Movie title is ${titleReq}`);
    break;
  case 'do-what-it-says':
    console.log('do what it says.');
    //not done. not fussed if i don't get here.
    break;
  default:
    console.log(`Sorry, I do not recognise ${command}. Please choose from the following: my-tweets, spotify-this-song, movie-this, or do-what-this-says`);
}


