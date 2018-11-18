// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
//var users = require("./models/Usuario");
//var users = require("./users");
export default app => {
    const users = app.require("./models/Usuario");
    const opts = {};
}




/*
var cfg = require("./config");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
      //Busca de um usuário, Buscar no mongoDB
    var user = users[payload.id] || null;

    if (user) {
      return done(null, {id: user.id});
    } else {
      return done(new Error("User not found"), null);
    }
  });

  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
*/