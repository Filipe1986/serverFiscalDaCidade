var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database');
var morgan      = require('morgan');

var router = require('./routers');
var routersUsuario = require('./routersUsuario');
var routerFile = require('./routerFile');


  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan());
  app.use('/uploads', express.static('uploads'));


  app.use('/api', routersUsuario);
  app.use('/api', router);
  app.use('/api', routerFile);

var port = process.env.PORT || 4000;
app.listen(port);
console.log('go to   http://localhost:' + port + '/api');

module.exports = app;
