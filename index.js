// server.js

// set up ======================================================================
// const app = require('./app')
const express    = require('express')
const app        = express()
const PORT       = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const session    = require('express-session')
const passport   = require('passport')
const flash      = require('connect-flash')
const mongoose   = require('mongoose')
const keys       = require('./config/keys')

// configuration ===============================================================
require('./app/models/User');
mongoose.Promise = global.Promise;// connect to our database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true,useUnifiedTopology: true })
    .then(connect => console.log('connected to mongodb'))
    .catch(err => console.log('could not connect to mongodb', err))
module.exports = {mongoose}
// let db = mongoose.connection;
// db.on('error', ()=>{
//     console.error('Unable to connect MongoDB!')
// });
// db.once('open', ()=> {
//     console.log('Connected to mongoDB!');
// });
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.use(logger('dev')); // log every request to the console
//app.use(cookieParser()); // read cookies (needed for auth)
// app.use(
//     cookieSession({
//         maxAge: 30*24*60*60*1000,
//         keys: [keys.cookieKey]
//     })
// )
app.use(bodyParser.urlencoded({extended: false})) // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ 
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
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

app.listen(PORT, (err) =>{
    if(!err)
        console.log('server started running on:' + PORT);
    else
        console.log('unable to start server');    
})