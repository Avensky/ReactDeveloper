const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')


const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log('*** serializeUser called, user: ')
	console.log(user) // the whole raw user object!
	console.log('---------')
  done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
  console.log('DeserializeUser called')
  User.findById(id).then(user => {
    console.log('*** Deserialize user, user:')
    console.log(user)
    console.log('--------------')
    done(null, user);
  });
});

  
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        }, 
        async (accessToken, refreshToken, profile, done) => {
            console.log('profile', profile);
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({ 
              googleId: profile.id,
              username: profile._json.name,
              givenName: profile._json.given_name,
              familyName: profile._json.family_name,
              picture: profile._json.picture,
              email: profile._json.email,
              date : new Date()
            }).save();
            done(null, user);
        }
    )
);
