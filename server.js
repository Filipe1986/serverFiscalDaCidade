var express = require('express');
var appExpress = express();
var bodyParser = require('body-parser');
var router = require('./routers');

var port = process.env.PORT || 4000;

appExpress.use(bodyParser.urlencoded({ extended: true }));
appExpress.use(bodyParser.json());

appExpress.use('/api', router);

appExpress.listen(port);
console.log('go to   http://localhost:' + port + '/api');



module.exports = appExpress;