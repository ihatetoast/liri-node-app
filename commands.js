require("dotenv").config();
const request = require('request');
const Table = require('cli-table');

const Spotify = require('node-spotify-api');
const Twitter = require('twitter');

const keys = require('./keys');

//instantiations:
const client = new Twitter(keys.twitter);
const spotify = new Spotify(keys.spotify);
const table = new Table({
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
  , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
  , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
  , 'right': '' , 'right-mid': '' , 'middle': ' ' },
style: { 'padding-left': 0, 'padding-right': 0 }
});
// * This will show the following information about the song in your terminal/bash window
//      * Artist(s) //later loop. use table to display
//      * The song's name//user input
//      * A preview link of the song from Spotify//const preview
//      * The album that the song is from// const album
//    * If no song is provided then your program will default to "A town called Malice" by The Jam because ace of base blows.

const spotifyThisSong = (title) =>{
  spotify.search({ 
    type: 'track', 
    query: title || 'A Town Called Malice'
  }, 
    function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
  //v1: return just one. (want to finish all 4 before returning to loop over returned data). 
  const preview = data.tracks.items[0].preview_url;
  const artist = data.tracks.items[0].artists[0].name;
  const album = data.tracks.items[0].artists[0].name;
  console.log(`artist is ${artist}`);
  });
}

const movieThis = (name) =>{
  const url = `http://www.omdbapi.com/?t=${name || 'the castle'}&apikey=6a1aca9d`
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const info = JSON.parse(body);
      table.push (
        {'Movie Title': info.Title},
        {'Release Date': info.Year},
        {'IMDB Rating': info.Ratings[0].Value},
        {'Rotten Tomatoes Rating': info.Ratings[1].Value},
        {'Country(ies)': info.Country },
        {'Language': info.Language},
        {'Starring': info.Actors},
        {'Plot': info.Plot},
      )
      console.log(table.toString());
    }
  });
}

const myTweets = () => {
  //BLOODY HELL!
  client.get('statuses/user_timeline.json?screen_name=katyannedegraes&count=20', function(error, tweets, response){
    if(error) throw error;
    console.log("THE TWEETS");
    // console.log(typeof tweets);  // returns object  
    for (const tweet in tweets) {
      // console.log(`${parseInt(tweet)+1}) ${tweets[tweet]["text"]} \ncreated at ${tweets[tweet]["created_at"]}`);
      table.push (
      {'tweet': tweets[tweet]["text"]},
      {'on': tweets[tweet]["created_at"]},
      { '' : "🐦 🐦 🐦 🐦 🐦 🐦 🐦 🐦"}
      )
    }
    console.log(table.toString());
  })
 
}

module.exports = {
  spotifyThisSong,
  movieThis,
  myTweets
}