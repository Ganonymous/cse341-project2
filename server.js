const express = require('express');
const app = express();

const mongoDb = require('./data/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github').Strategy;

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({ secret: '33514313', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.setHeader('Access-Controll-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Controll-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
  next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));
app.use('/', require('./routes'));

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.use(async (err, req, res, next) => {
  console.log(err);
  console.error(`Error at: "${req.originalURI}": ${err}`);
  res.status(500).send(err.message || "Uh Oh! Something we didn't account for went wrong!");
});

mongoDb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Running on port ${port}`));
  }
});
