const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// punkAPI.getRandom()
//   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//   .catch(err => console.log(err)); 

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
