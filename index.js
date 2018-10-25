const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const danceevent = require('./routes/danceevent.route'); 

const mongo = process.env.MONGODB_URI;
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect(mongo, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//---------PASSPORT

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function extractProfile (profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  };
}

passport.use(new GoogleStrategy({
  clientID: process.env.OAUTH2_CLIENT_ID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  callbackURL: 'https://quiet-reaches-88393.herokuapp.com/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  cb(null, extractProfile(profile));
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

router.get(
  // OAuth 2 callback url. Use this url to configure your OAuth client in the
  // Google Developers console
  '/auth/google/callback',

  // Finish OAuth 2 flow using Passport.js
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),

  // Redirect back to the original page, if any
  (req, res) => {
    const redirect = req.session.oauth2return || '/';
    delete req.session.oauth2return;
    res.redirect(redirect);
  }
);

// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired (req, res, next) {
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('https://quiet-reaches-88393.herokuapp.com/auth/login');
  }
  next();
}

// Middleware that exposes the user's profile as well as login/logout URLs to
// any templates. These are available as `profile`, `login`, and `logout`.
function addTemplateVariables (req, res, next) {
  res.locals.profile = req.user;
  res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}

//---------PASSPORT

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/event', danceevent);

app.get('/api/profile/:profileid', (req,res) => {
	res.send("profile with id: "+req.params.profileid);
})

app.get('/api/*', (req,res) => {
	res.send("This is the generic API page");
})

app.get('/', oauth2.required, (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/client/css/materialize.min.css', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/css/materialize.min.css'));
});

app.listen( port, () => {
	console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env) 
})
