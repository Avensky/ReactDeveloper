const path = require('path')
const express = require('express')
//app.use(express.json())
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
// app.use(bodyParser.json())
const passport = require('passport')
// require('./services/passport');
const redis = require('redis')
const session = require('express-session')
// const cookieSession = require('cookie-session');
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

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

app.use(bodyParser.urlencoded({
    extended: false
}))

require('./authentication').init(app)

app.use(session({
//    store: new RedisStore({url: config.redisStore.url}),
    store: new RedisStore({ client: redisClient }),
//    secret: config.redisStore.secret,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// app.use(
//     cookieSession({
//         maxAge: 30*24*60*60*1000,
//         keys: [keys.cookieKey]
//     })
// )

app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname),
    partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

require('./user').init(app)
require('./note').init(app)

module.exports = app
