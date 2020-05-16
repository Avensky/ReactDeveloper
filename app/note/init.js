const passport = require('passport')

function initUser (app) {
  app.get('/notes/:id', passport.authMiddleware(), (req, res) => {
    res.render('note/overview', {
      id: req.params.id
    })
  })
}

module.exports = initUser
