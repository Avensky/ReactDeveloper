const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(connect => console.log('connected to mongodb'))
    .catch(err => console.log('could not connect to mongodb', err))
module.exports = {mongoose}

const app = express()
app.use(express.json())
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

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
require('./routes/postRoutes')(app);
require('./routes/accountRoutes')(app);

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