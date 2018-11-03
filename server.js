var express = require('express');
var appExpress = express();
var bodyParser = require('body-parser');

const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');

var router = require('./routers');
var routersUsuario = require('./routersUsuario');
var routerFile = require('./routerFile');


appExpress.use(busboy());

appExpress.use(bodyParser.urlencoded({ extended: true }));
appExpress.use(bodyParser.json());

appExpress.use(busboyBodyParser());

appExpress.use('/api', routersUsuario);
appExpress.use('/api', router);
appExpress.use('/api', routerFile);




var port = process.env.PORT || 4000;
appExpress.listen(port);
console.log('go to   http://localhost:' + port + '/api');

module.exports = appExpress;