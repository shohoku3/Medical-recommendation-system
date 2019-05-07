const express = require('express')
const router = express.Router()

const checkLogin = require('../lib/check').checkLogin

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
  req.session.user = null
  req.flash('success', '登出成功')
  // 登出成功后跳转到主页
  res.redirect('/index')
})

module.exports = router