var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var rememberMeStrategy = require('passport-remember-me').Strategy;
var express = require('express');
var flash = require('connect-flash');

function register(app) {
    app.use(express.static(__dirname + '/../public'));
    app.set('views', __dirname + '/../views');
    app.set("view engine", "jade");
    app.use(flash());
    app.use(express.bodyParser())
    app.use(express.cookieParser());
    app.use(express.session({ secret: '<secret>' }));

    passport.use(new localStrategy({usernameField: 'email'},
        function(username, password, done) {
            // Code for finding user here
        }
    ));

    passport.use(new rememberMeStrategy(
      function(token, done) {
        // Code for finding user via remember_me token here
      },
      function(user, done) {
        // Code for re-issuing a new remember_me token after successful login to a user here
      }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // Code for finding a user via their ID here
    });

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('remember-me'));
}


function authenticated(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('<redirect location here>')
}

// When a user has been authenticated via the session, this will issue a remember me token
// to them (as long as they've chosen the 'remember me' option)
function issueRememberMeToken(req, res, next) {

    if (!req.body.remember_me) { return next(); }

    var token = '<token generating logic here>';

   // Code for saving the user with their new remember_me token in the database here
}

exports.register = register;
exports.authenticated = authenticated;
exports.issueRememberMeToken = issueRememberMeToken;