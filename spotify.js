require("dotenv").config();
const Spotify = require('node-spotify-api');


const keys = require('./keys');

//instantiations:
const spotify = new Spotify(keys.spotify);

module.exports.spotifyThisSong = (title) =>{
  console.clear();
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