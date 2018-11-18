// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
//var users = require("./models/Usuario");
//var users = require("./users");
export default app => {
    const users = app.require("./models/Usuario");
    const opts = {};
}