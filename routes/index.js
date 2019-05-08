module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/index')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/index', require('./home'))
  app.use('/tag', require('./tag'))
  app.use('/content', require('./content'))
  //app.use('/comments', require('./comments'))
}