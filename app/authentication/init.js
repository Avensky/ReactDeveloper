const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const authMiddleware = require('./middleware')

// Generate password
const saltRounds = 10
const myPlainPassword = 'ae86'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlainPassword, salt)

const user = {
    username: 'test',
    passwordHash,
    id: 1
}

function findUser (username, callback) {
    if (username === user.username) {
      return callback(null, user)
    }
    return callback(null)
  }
  
  passport.serializeUser(function (user, cb) {
    cb(null, user.username)
  })
  
  passport.deserializeUser(function (username, cb) {
    findUser(username, cb)
  })
  
  function initPassport () {
    passport.use(new LocalStrategy(
      (username, password, done) => {
        findUser(username, (err, user) => {
          if (err) {
            return done(err)
          }
  
          // User not found
          if (!user) {
            console.log('User not found')
            return done(null, false)
          }
  
          // Always use hashed passwords and fixed time comparison
          bcrypt.compare(password, user.passwordHash, (err, isValid) => {
            if (err) {
              return done(err)
            }
            if (!isValid) {
              return done(null, false)
            }
            return done(null, user)
          })
        })
      }
    ))
  
    passport.authMiddleware = authMiddleware
  }
  
  module.exports = initPassport