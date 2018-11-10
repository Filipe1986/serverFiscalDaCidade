var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

var router = require('./routers');
var routersUsuario = require('./routersUsuario');
var routerFile = require('./routerFile');





  app.use(busboy());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(busboyBodyParser());

  app.use('/api', routersUsuario);
  app.use('/api', router);
  app.use('/api', routerFile);










var port = process.env.PORT || 4000;
app.listen(port);
console.log('go to   http://localhost:' + port + '/api');

module.exports = app;