// app/routes.js

const requireLogin = require('../middlewares/requireLogin');

module.exports = (app, passport) => {

    app.get(
        '/api/current_user', (req, res) => {
        res.send(req.user);
      });

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    // app.get('/', (req, res) => {
    //     res.render('index.ejs'); // load the index.ejs file
    // });

    app.get(
        '/', (req, res, next) => {
          console.log('===== user!!======')
          console.log(req.user)
        if (req.user) {
            res.json({ user: req.user })
        } else {
            res.json({ user: null })
        }
      })

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
//  app.post('/api/logout', (req, res) => {
//      if (req.user) {
//          req.logout();
//          res.send({ msg: 'logging out' })
//          res.redirect('/');
//      } else {
//          res.send({ msg: 'no user to log out' })
//      }
//  });

    app.get(
        '/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
      })

    // =====================================
    // API =================================
    // =====================================
    app.get(
        '/api', (req, res, next) => {
          console.log('===== user!!======')
          console.log(req.user)
        if (req.user) {
            res.json({ user: req.user })
        } else {
            res.json({ user: null })
        }
    })
// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================
// =====================================
// LOCAL ===============================
// =====================================
    // =====================================
    // LOGIN ===============================
    // =====================================
        
    app.get('/login', function(req, res) {
         // render the page and pass in any flash data if it exists
         res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
    }));
    
    // =====================================
    // REGISTER ============================
    // =====================================
//    app.get('/signup', function(req, res) {
//
//        // render the page and pass in any flash data if it exists
//        res.render('signup.ejs', { message: req.flash('signupMessage') });
//    });
//
//    // process the signup form
//	app.post('/signup', passport.authenticate('local-signup', {
//
//		successRedirect : '/profile', // redirect to the secure profile section
//		failureRedirect : '/signup', // redirect back to the signup page if there is an error
//		failureFlash : true // allow flash messages
//	}));
    app.post('/api/addUser', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages    
    }));
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 

        scope : ['public_profile', 'email']
    }));
  
    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {

            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {

            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get(
        '/auth/google', 
        passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect : '/login'}),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect('/blog');
        }
    );
// =============================================================================
// AUTHORIZE (FIRST LOGIN) =====================================================
// =============================================================================

	// locally --------------------------------
    app.get('/connect/local', (req, res) => {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
// =====================================
// facebook ============================
// =====================================
    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
// =====================================
// twitter =============================
// =====================================
    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

// =====================================
// google ==============================
// =====================================
    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email','picture', 'familyName'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            failureRedirect : '/'
        }));


// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {

        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {

        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function(req, res) {

        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
           res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', (req, res) => {

        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
           res.redirect('/');
        });
    });

};

// route middleware to make sure a user is logged in
isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}