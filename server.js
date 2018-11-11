var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./routers');
var routersUsuario = require('./routersUsuario');
var database = require('./database');

var port = process.env.PORT || 4000;

//app.set('superSecret', config.secret); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api', routersUsuario);

app.listen(port);
console.log('go to   http://localhost:' + port + '/api');



module.exports = app;