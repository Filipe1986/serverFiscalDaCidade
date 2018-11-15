var mongoose = require('mongoose');
var mongoDB = 'mongodb://heroku_bjdxk913:6kaum7nm90782lpnde5gqvh0s@ds119523.mlab.com:19523/heroku_bjdxk913' 
||'mongodb://127.0.0.1/my_database';


const config = {
    autoIndex: false,
    useNewUrlParser: true,
};

mongoose.connect(mongoDB, config);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('MongoDB conectado');
});

module.exports = db;