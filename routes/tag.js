const express = require('express')
const router = express.Router()

const checkNotLogin = require('../lib/check').checkNotLogin

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('tag')
})

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  res.send('tag')
})

module.exports = router