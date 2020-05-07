const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
module.exports = app => {
  app.post('/api/addUser',(req,res)=>{        //add a new post
    //    const { title, author, content} = req.body;
        const userObj = new User({
            name :req.body.username, 
            givenName :req.body.givenName, 
            familyName :req.body.familyName, 
            email :req.body.email, 
            password :req.body.password
        })
        userObj.save((err)=>{
            if(err){
            console.log(err);
            res.send('Unable to save user data!');
            }
            else
            res.send('User data saved successfully!');
        })
      });


  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/blog');
    }
  );

  app.get(
    '/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/times', (req, res) => res.send(showTimes()));
};

showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' '
  }
  return result;
}