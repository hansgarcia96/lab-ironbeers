
const express = require('express');
const hbs = require('hbs');

const app = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views'); // Sets where we have grouped our views - Tells Express where to look for the views
 // Tells Express that HBS is in charge of rendering the HTML files
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
 punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {beers})
    })
    .catch(error => {
      console.log(error)
    })
});

app.get("/randomBeer", (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('randomBeer.hbs', beers[0]);
      //console.log(beers[0])
    })
    .catch(error => {console.log(error)
    })
 });

app.listen(8080);
