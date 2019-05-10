const express=require('express')
const router=express.Router()

const checkLogin=require('../lib/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  res.render('index')
})

module.exports = router