// config/passport.js

// load all the things we need
const LocalStrategy     = require('passport-local').Strategy;
const FacebookStrategy  = require('passport-facebook').Strategy;
const TwitterStrategy   = require('passport-twitter').Strategy;
const GoogleStrategy    = require('passport-google-oauth20').Strategy;
const mongoose          = require('mongoose')

// load up the user model
const User              = mongoose.model('users')

// load the auth variables
const configAuth        = require('./secrets');

// expose this function to our app using module.exports
module.exports          = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
 //       console.log('*** serializeUser called, user: ')
 //       console.log(user) // the whole raw user object!
 //       console.log('---------')
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('DeserializeUser called')
        User.findById(id, function(err, user) {
 //           console.log('*** Deserialize user, user:')
 //           console.log(user)
 //           console.log('--------------')
            done(err, user);
        });
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass back the entire request to the callback
    },
    (req, done) => {

        console.log('user signup');        
        
        // asynchronous
        process.nextTick(() => {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  req.body.email }, (err, existingUser) => {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (existingUser) 
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                    var user            = req.user;
                    user.local.email    = req.body.email;
                    user.local.password = user.generateHash(req.body.password);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
                //  We're not logged in, so we're creating a brand new user.
                else {

                    // if there is no user with that email
                    // create the user
                    var newUser            = new User();

                    // set the user's local credentials
                    newUser.local.email         = req.body.email;
                    newUser.local.password      = newUser.generateHash(req.body.password); // use the generateHash function in our user model
                    newUser.local.username      = req.body.username, 
                    newUser.local.givenName     = req.body.givenName, 
                    newUser.local.familyName    = req.body.familyName,
                    newUser.local.picture       = req.body.picture,
                    newUser.local.date          = new Date()
                    // save the user
                    newUser.save((err) => {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }   

            });
        })

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true // allows us to pass back the entire request to the callback
    },
    async (req, email, password, done) => { // callback with email and password from our form

        // asynchronous
//        process.nextTick(function() {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, (err, user) => {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });
//       })
    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        profileFields   : ['id', 'displayName', 'photos', 'email','first_name', 'last_name'],
        enableProof     : true

    },

    // facebook will send back the token and profile
    function (req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        // just add our token and profile information
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        let newUser            = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                // update the current users facebook credentials
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, tokenSecret, profile, done) {

        // asynchronous
        // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {

                    // if there is a user id already but no token (user was linked at one point and then removed)
                    // just add our token and profile information
                    if (!user.twitter.token) {
                        user.twitter.token = token;
                        user.twitter.name  = profile.username
                        user.twitter.displayName = profile.displayName;

                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    }
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        } else {
            // user already exists and is logged in, we have to link accounts
            var user                 = req.user; // pull the user out of the session

            // update the current users facebook credentials
            user.twitter.id          = profile.id;
            user.twitter.token       = token;
            user.twitter.username    = profile.username;
            user.twitter.displayName = profile.displayName;

            // save the user
            user.save(function(err) {
                if (err)
                    throw err;
                return done(null, user);
            });
        }});
    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID            : configAuth.googleAuth.clientID,
        clientSecret        : configAuth.googleAuth.clientSecret,
//        callbackURL       : configAuth.googleAuth.callbackURL,
        callbackURL         : "/auth/google/callback",
        passReqToCallback   : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        proxy               : true

    },
    async (req, token, refreshToken, profile, done) => {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
//        process.nextTick(() =>{
            console.log('profile', profile);

            // check if the user is already logged in
            if (!req.user) {
            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, (err, user) => {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                if (user) {
                                        
                    // if there is a user id already but no token (user was linked at one point and then removed)
                    // just add our token and profile information
                    if (!user.google.token) {
                        user.google.token        = token;
                        //user.google.name       = profile.displayName;
                        user.google.username     = profile.displayName;
                        user.google.givenName    = profile.givenName;
                        user.google.familyName   = profile.familyName;
                        user.google.picture      = profile.picture;
                        user.google.date         = new Date();
                        //user.google.name       = profile.name.givenName + ' ' + profile.name.familyName;
                        user.google.email        = profile.emails[0].value;
                        user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                    }

                    // if a user is found, log them in
                    return done(null, user); // user found, return that user
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser                 = new User();

                    // set all of the relevant information
                    newUser.google.id           = profile.id;
                    newUser.google.token        = token;
                    newUser.google.username     = profile.displayName;
                    newUser.google.givenName    = profile.givenName;
                    newUser.google.familyName   = profile.familyName;
                    newUser.google.picture      = profile.picture;
                    newUser.google.date         = new Date();
                    //newUser.google.name       = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.google.email        = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        } else {
            // user already exists and is logged in, we have to link accounts
            var user                    = req.user; // pull the user out of the session

            // update the current users facebook credentials
            user.google.id              = profile.id;
            user.google.token           = token;
//            user.google.name          = profile.displayName;
            newUser.google.username     = profile.displayName;
            newUser.google.givenName    = profile.givenName;
            newUser.google.familyName   = profile.familyName;
            newUser.google.picture      = profile.picture;
            newUser.google.date         = new Date();
            //user.google.name          = profile.name.givenName + ' ' + profile.name.familyName;
            user.google.email           = profile.emails[0].value;

            // save the user
            user.save(function(err) {
                if (err)
                    throw err;
                return done(null, user);
            });
        }
    // });
    })); 
};
