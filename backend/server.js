const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../backend/config')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser')
const postsRoutes = require('./routes/posts.routes');
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')

const app = express();

/* MIDDLEWARE */

passport.use(new GoogleStrategy({
  clientID: `${config.clientID}`,
  clientSecret: `${config.clientSecret}`,
  callbackURL: `${config.callback}`,
}, (req, accessToken, refreshToken, profile, done) => {
done(null, profile);
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())

/* API ENDPOINTS */
app.use('/api', postsRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
const dbURI =`mongodb+srv://${config.user}:${config.pass}@cluster0.ltq2j.mongodb.net/AnnounceMe?retryWrites=true&w=majority`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfullay connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
