const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
