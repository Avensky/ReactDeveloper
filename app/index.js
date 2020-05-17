const path = require('path')
const express = require('express')
//app.use(express.json())
//const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// app.use(bodyParser.json())

// require('./services/passport');
const flash = require('connect-flash');

const session = require('express-session')
// const cookieSession = require('cookie-session');
const redis = require('redis')
//let RedisStore = require('connect-redis')(session)
//let redisClient = redis.createClient()
// let redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6123,
//     password: 'my secret',
//     db: 1,
//   })
// redisClient.unref()
// redisClient.on('error', console.log)
  
//let store = new RedisStore({ client: redisClient })

const config = require('../config')
const app = express()

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: false})) // get information from html forms

require('./authentication').init(app)

// app.use(session({
// //    store: new RedisStore({url: config.redisStore.url}),
//     store: new RedisStore({ client: redisClient }),
// //    secret: config.redisStore.secret,
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }))

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
)

// pass passport for configuration
app.use(session({ secret: 'secret' })); // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(morgan('dev')); // log every request to the console

// app.engine('.hbs', exphbs({
//     defaultLayout: 'layout',
//     extname: '.hbs',
//     layoutsDir: path.join(__dirname),
//     partialsDir: path.join(__dirname)
// }))
// 
// app.set('view engine', '.hbs')
// app.set('views', path.join(__dirname))
// 
// require('./user').init(app)
// require('./note').init(app)

const keys = require('../config/keys');
// db
const mongoose = require('mongoose');
require('./models/User');
mongoose.Promise = global.Promise;
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

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/accountRoutes')(app);

module.exports = app
