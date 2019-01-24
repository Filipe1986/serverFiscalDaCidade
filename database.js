var mongoose = require('mongoose');
var mongoDB ='mongodb://heroku_n4jp8097:n513nau7ou9l6ijvvsckfdf7fk@ds253324.mlab.com:53324/heroku_n4jp8097'
//OLD
//var mongoDB = 'mongodb://heroku_bjdxk913:6kaum7nm90782lpnde5gqvh0s@ds119523.mlab.com:19523/heroku_bjdxk913' ;


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