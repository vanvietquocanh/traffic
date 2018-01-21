var express = require('express');
var path = require('path');
var passport = require("passport")
var bodyParser = require('body-parser');
var FacebookStrategy = require('passport-facebook');
var sassMiddleware = require('node-sass-middleware');
var session = require("express-session")

var home = require('./routes/home');
var index = require('./routes/index');
var signin = require('./routes/signin');
var saveData = require('./routes/saveData');
var apiAwaitingApproval = require('./routes/apiAwaitingApproval');
var calendar = require('./routes/calendar');
var profile = require('./routes/profile');
var special = require('./routes/special');
var offers = require('./routes/offers');
var phono = require('./routes/phono');
var checkicon = require('./routes/checkicon');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(
                { secret: 'coppycat',
                  resave: true,
                  saveUninitialized: true,
                  cookie:{
                    path:"/admin",
                    maxAge:86400000
                  }
                }
              ));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
    clientID: "148127002482488",
    clientSecret: "f85117c134e80d3ecd07b4baa3bb41a4",
    callbackURL: 'http://localhost:3000/admin',
    profileFields: ['id', 'displayName', 'photos', 'email'],
     enableProof :  false
  }, function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    }))
passport.serializeUser((user, done)=>{
  done(null, user)
})
passport.deserializeUser((id, done)=>{
  done(null, id)
})

app.route("/facebook").get(passport.authenticate("facebook"))
app.use('/', home);
app.use('/signin', signin);
app.use('/admin', index);
app.use('/calendar', calendar);
app.use('/savedata', saveData);
app.use('/apiAwaitingApproval', apiAwaitingApproval);
app.use('/profile', profile);
app.use('/special', special);
app.use('/offers', offers);
app.use('/phono', phono);
app.use('/checkicon', checkicon);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
