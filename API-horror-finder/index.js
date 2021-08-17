require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(router);

   app.listen(port, _ => {
      console.log(`http://localhost:${port}`);
   });



//! cors pour que les gens accèdent à notre api
//! N'oublie pas le truc du url extended : true !!