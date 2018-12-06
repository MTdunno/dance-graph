const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const danceevent = require('./routes/danceevent.route'); 
const auth_route = require('./routes/auth.route'); 

const mongo = process.env.MONGODB_URI;
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

mongoose.connect(mongo, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//---------PASSPORT

const session = require('express-session');
const MemcachedStore = require('connect-memjs')(session);
const passport = require('passport');

var cors = require('cors')
app.use(cors())

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.OAUTH2_CLIENT_SECRET,
  signed: true
};

// In production use the Memcache instance to store session data,
// otherwise fallback to the default MemoryStore in development.
if (process.env.MEMCACHE_URL) {
  if (process.env.MEMCACHE_USERNAME && process.env.MEMCACHE_PASSWORD) {
    sessionConfig.store = new MemcachedStore({
      servers: [process.env.MEMCACHE_URL],
      username: process.env.MEMCACHE_USERNAME,
      password: process.env.MEMCACHE_PASSWORD});
  } else {
    sessionConfig.store = new MemcachedStore({
      servers: [process.env.MEMCACHE_URL]
    });
  }
}

app.use(session(sessionConfig));


app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require('passport-google-oauth20').Strategy;

function extractProfile (profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl === undefined ? '' : imageUrl.replace( /sz=50/g , 'sz=250' ) 
  };
}

passport.use(new GoogleStrategy({
  clientID: process.env.OAUTH2_CLIENT_ID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  callbackURL: 'https://quiet-reaches-88393.herokuapp.com/',
  scope: ['profile', 'email']
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

app.get(
  // Login url
  '/auth/login',

  // Save the url of the user's current page so the app can redirect back to
  // it after authorization
  (req, res, next) => {
	console.log(req.query.return);
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.query.return) {
      req.session.oauth2return = req.query.return;
    }else {req.session.oauth2return = 'https://quiet-reaches-88393.herokuapp.com'}
    next();
  },

  // Start OAuth 2 flow using Passport.js
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  // OAuth 2 callback url. Use this url to configure your OAuth client in the
  // Google Developers console
  '/auth/google/callback',

  // Finish OAuth 2 flow using Passport.js
  passport.authenticate('google', {
							accessType: 'offline',
							prompt: 'consent'
						}),

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
  console.log(req.user);
  if (!req.user) {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/auth/login');
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
app.use('/profile', auth_route);

//app.get('/api/profile/:profileid', (req,res) => {
//	res.send("profile with id: "+req.params.profileid);
//})

app.get('/api/*', (req,res) => {
	res.send("This is the generic API page");
})

app.get('/', authRequired, (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/client/css/materialize.min.css', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/css/materialize.min.css'));
});

app.listen( port, () => {
	console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env) 
})
