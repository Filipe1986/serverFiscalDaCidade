const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database');

var router = require('./Routes/routers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
//app.use('/api', routerFile);

var port = process.env.PORT || 4000;
app.listen(port);
console.log('go to   http://localhost:' + port + '/api');

module.exports = app;
