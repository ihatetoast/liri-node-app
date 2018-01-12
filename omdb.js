const request = require('request');
const Table = require('cli-table');
const table = new Table({
  chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
  , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
  , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
  , 'right': '' , 'right-mid': '' , 'middle': ' ' },
style: { 'padding-left': 0, 'padding-right': 0 }
});
module.exports.movieThis = (name) =>{
  console.clear();
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

