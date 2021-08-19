require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 3001;

const router = require('./app/routers');


app.use(express.json());

app.use(router);

app.use(express.urlencoded({
  extended: true
}));


app.listen(port, _ => {
  console.log(`http://localhost:${port}`);
});


//! cors pour que les gens accèdent à notre api