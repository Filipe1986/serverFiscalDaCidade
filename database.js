var mongoose = require('mongoose');
var mongoDB = 'mongodb://heroku_fvlkkwmn:2qfj8unf0eakilrlo67n3kvulc@ds119523.mlab.com:19523/heroku_fvlkkwmn' ||'mongodb://127.0.0.1/my_database';


const config = {
    autoIndex: false,
    useNewUrlParser: true,
};

mongoose.connect(mongoDB, config);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('conectado');
});

module.exports = db;