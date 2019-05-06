module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/post')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/post', require('./post'))
  //app.use('/comments', require('./comments'))
}