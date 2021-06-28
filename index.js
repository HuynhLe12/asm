const express = require ('express');
const exphbs  = require('express-handlebars');
const fs = require('fs');
const path = require ('path');
const app = express();
const router = express.Router();
const port = process.env.PORT  || 8888;

//
 
app.listen(port);
console.log(`my app is running at port ${port}`);