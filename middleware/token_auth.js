var passport = require('passport');
var bearerStrategy = require('passport-http').Strategy;

function register(app) {
  passport.use(new BasicStrategy(
    function(username, password, done) {
      // Code to find user via username and password
    }
  ));
};

exports.register = register;