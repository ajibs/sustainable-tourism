const express = require('express');
const helmet = require('helmet');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const csurf = require('csurf');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();


// secure app by setting http headers
app.use(helmet());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// serves up static files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));


// retrieve information from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// exposes a bunch of methods for validating data. used heavily in userController
app.use(expressValidator());


// populate req.cookies with any cookies that come along with the request
app.use(cookieParser());


// store data on visitors from request to request and keep them logged in
const sess = {
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 3600000
  }
};

// use secure cookies in production
if (app.get('env') === 'production') {
  // trust first proxy
  app.set('trust proxy', 1);
  // serve cookies only when the browser connection is HTTPS
  sess.cookie.secure = true;
}

app.use(session(sess));

// initialize passport and use persistent login sessions
app.use(passport.initialize());
app.use(passport.session());


// protect site from Cross Site Request Forgery
app.use(csurf());


// flash messages to user screen
app.use(flash());


// expose helper variables to templates
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.csrfToken = req.csrfToken();
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  next();
});


// load routes
app.use('/', routes);


// if routes don't work, 404 them and forward to error handler
app.use(errorHandlers.notFound);

// see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// csurf Token errors
app.use(errorHandlers.csurfErrors);

// Otherwise it was a really bad error we didn't expect
if (app.get('env') === 'development') {
  // development error handler: prints stack trace
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);


module.exports = app;
