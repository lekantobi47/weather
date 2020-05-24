const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Make the app send static files in public folder
app.use(express.static('public'));

// Use body-parser middleware to get post requests data
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
