require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";

const express     = require("express");
const app         = express();
const server      = require('http').Server(app);
const io          = require('socket.io')(server);
const session     = require('express-session');

const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');


const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Modules
const Routes      = require("./routes/routes");


//Only use knexLogger and morgan in development.
//Load the logger first so all (static) HTTP requests are logged to STDOUT
//'dev' = Concise output colored by response status for development use.
//The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
if (ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
  const knexLogger = require('knex-logger');
  app.use(knexLogger(knex));
}

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
 function(accessToken, refreshToken, profile, done) {
    knex('users').where('github_id', profile.id).then(user => {
      let userQuery;
      if (user.length === 0) {
        console.log('userid', user.id)
        userQuery = knex('users').insert({
          github_login: profile.username,
          github_avatar: profile._json.avatar_url,
          github_name: profile.displayName,
          github_id: profile.id,
          github_token: accessToken
        }).returning('github_id')
      } else {
        userQuery = knex('users').where('github_id', profile.id).update({
          github_token: accessToken
        }). returning('github_id')
      }
      userQuery.then((github_id) => {
        return done(null, github_id[0]);
      })
    })
  }
));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });


// Mount all resource routes

let bundleGenerated = 'http://localhost:3000/build/bundle-generated.js';
app.use("/", Routes(knex, bundleGenerated));


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

//====================*******Handling the websocket connection******===================

io.on('connection', (client) => {
  console.log('client connected');
  //TODO create another module to handle the transactions
  client.emit('news', { hello: 'world' });
  client.on('my other event', (data) => {
    console.log(data);
  });
});
