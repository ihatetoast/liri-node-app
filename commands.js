require("dotenv").config();
const fs = require('fs');

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

const spotifyThisSong = (title) =>{
  spotify.search({ 
    type: 'track', 
    query: title || 'A Town Called Malice'
  }, 
    function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
 
  const preview = data.tracks.items[0].preview_url;
  const artist = data.tracks.items[0].artists[0].name;
  const album = data.tracks.items[0].artists[0].name;
  console.log(`${title || "A Town Called Malice"} ${artist}.`);
      table.push(
        {'Title': title || 'A Town Called Malice'},
        {'Artist': artist || "The Jam"},
        {'Album': album || ''},
        {'Preview': preview || ''}
      )
      console.log(table.toString());
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
    for (var tweet in tweets) {
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
const randomCommandom = () => {
  //bloody hell part two
  //looks like what is read is an object and the comma phux things up. 
  // const random = fs.readFileSync('random.txt', utf8);
  fs.readFile("random.txt", "utf8", function(error, text) {
    if (error)
      throw error;
    console.log(typeof text);
    var textperiment = text.split(',');
    
    console.log(`textperiment is ${textperiment}`);
    // console.log(textperiment[1])
    const song = textperiment[1];
    const doThis = textperiment[0];
    spotifyThisSong(song);

  });
  // console.log(typeof random);//returns obj
  // console.log(random[0]);
}


module.exports = {
  spotifyThisSong,
  movieThis,
  myTweets,
  randomCommandom
}