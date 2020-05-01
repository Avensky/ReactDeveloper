const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(connect => console.log('connected to mongodb..'))
    .catch(e => console.log('could not connect to mongodb', e))
module.exports = {mongoose}

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
)

let db = mongoose.connection;
db.on('error', ()=>{
    console.error('Unable to connect MongoDB!')
});
db.once('open', ()=> {
    console.log('Connected to mongoDB!');
});

app.use(passport.initialize());
app.use(passport.session())
require('./routes/authRoutes')(app);
// let db = mongoose.connection;
// db.once('open', ()=> {
//     console.log('Connected to mongoDB');
// })
// 
// app.get('/', (req, res) => {
//     user.find({},(err,doc)=>{
//         if(doc)
//             res.json({"Available users": doc});
//         else {
//             res.err(err);
//         }
//     })
// })
// 
// app.post('/adduser',(req,res)=>{        //add a new book
//     var userObj = new user({
//         googleId: req.profile.id
//     })
//     userObj.save((err)=>{
//         if(err){
//         console.log(err);
//         res.send('Unable to save user data!');
//         }
//         else
//         res.send('user data saved successfully!');
//     })
// });
// 
// app.get('/getuserDetails/:googleId',(req,res)=>{              //get a book details
//     book.findOne({userId : req.params.userid},{},(err,doc)=>{
//         if(doc)
//             res.json(doc);
//         else {
//             res.status(404).send('Ops!Detail not found');
//         }
//     })
// });
// 
// app.post('/update',(req,res)=>{          //update a book data
//     user.findOneAndUpdate({userId : req.body.userid},(err,doc)=>{
//         if(doc)
//             res.send('User updated successfully!');
//         else {
//             res.err(err.message);
//         }
//     })
// });
// 
// app.delete('/deleteuser/:userid',(req,res)=>{           //delete a perticular book
//     book.findOneAndRemove({userId : req.params.userid},{},(err,doc)=>{
//         if(doc)
//             res.json(doc);
//         else {
//             res.status(404).send('Ops! User not found');
//         }
//     })
// });

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>{
    if(!err)
    console.log('server started running on:' + PORT);
    else
    console.log('unable to start server');
});