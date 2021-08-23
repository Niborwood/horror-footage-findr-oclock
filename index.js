require('dotenv').config();

const express = require('express');


const app = express();

const port = process.env.PORT || 3001;

const router = require('./app/routers');


app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // A changer avec la future adresse du front ..
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(router);

app.use(express.urlencoded({
  extended: true
}));


app.listen(port, _ => {
  console.log(`http://localhost:${port}`);
});