require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";

const express     = require("express");
const app         = express();
const server      = require('http').Server(app);
const io          = require('socket.io')(server);

const session     = require('express-session');
const passport    = require('passport');

const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Modules
const Routes      = require("./routes/routes");
const githubAuth  = require('./passport')(knex,passport);


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

//initialze passport, passport.session for persistent login
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


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
