const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// openWeatherMap api key, replace this with your own
const apiKey = "f0632a34f4a3e9d62d2389fff36a43b0";

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Make the app send static files in public folder
app.use(express.static('public'));

// Use body-parser middleware to get post requests data
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index', {weather: null, error: null});
});

app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, (err, response, body) => {
    if (err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else {
      let weather = JSON.parse(body);
      if (weather.main === undefined){
        res.render('index', {weather: null, error: 'Error, please check your input'});
      }
      else {
        let description = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1,);
        let weatherText = `${description} ${weather.main.temp} degrees in ${weather.name}, ${weather.sys.country}.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
