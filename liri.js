//keep it secret
require("dotenv").config();

//requires
const request = require('request');
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const Table = require('cli-table');
//instantiations:
const spotify = new Spotify(keys.spotify);
const movieTable = new Table();

// var client = new Twitter(keys.twitter);

const command = process.argv[2];
//capture 4th input which will be either
const titleReq = process.argv[3];

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
const spotifyThisSong = (title) =>{
  spotify.search({ 
    type: 'track', 
    query: titleReq || 'A Town Called Malice'
  }, 
    function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
  //v1: return just one. (want to finish all 4 before returning to loop over returned data). Sorry, but it took me two days to decipher the instructions.
  const preview = data.tracks.items[0].preview_url;
  const artist = data.tracks.items[2].artists[0].name;
  console.log(`artist is ${artist}`);
  });
}


/***************************
MOVIE THIS
*****************************/

/*
This will output the following information to your terminal/bash window:

       * Title of the movie
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced. <--Who cares?
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' <-- no. i'll choose my own defaults, thank you very much. THE CASTLE
 */

//  deal with this after all 4 f(x)s done
// let name = '';
// for(let i = 2; i<process.argv.length; i++){
//   name += " " + process.argv[i] 
// }

const movieThis = (name) =>{
  const url = `http://www.omdbapi.com/?t=${name || 'the castle'}&apikey=6a1aca9d`
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const info = JSON.parse(body);
      movieTable.push (
        {'Movie Title': info.Title},
        {'Release Date': info.Year},
        {'IMDB Rating': info.Ratings[0].Value},
        {'Rotten Tomatoes Rating': info.Ratings[1].Value},
        {'Country(ies)': info.Country },
        {'Language': info.Language},
        {'Starring': info.Actors},
        {'Plot': info.Plot},
      )
      console.log(movieTable.toString());

    }
  });
}






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
    spotifyThisSong(titleReq);
    console.log(`spotifyThisSong fired. and song name is ${titleReq}`);
    break;
  case 'movie-this':
    movieThis(titleReq)
    console.log(`movieThis is fired. Movie title is ${titleReq}`);
    break;
  case 'do-what-it-says':
    console.log('do what it says.');
    break;
  default:
    console.log(`Sorry, I do not recognise ${command}. Please choose from the following: my-tweets, spotify-this-song, movie-this, or do-what-this-says`);
}


