const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const UserModel = require('../models/user')
const checkNotLogin = require('../lib/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next) {
    res.render('signup')
})
// POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next) {
    const name = req.fields.name
    const avatar = req.files.avatar.path.split(path.sep).pop()
    let password = req.fields.password
    const repassword = req.fields.repassword
    const json=req.fields
    const phonenum=json['areacode']+json['hostcode']+json['extcode']
    // 校验参数
    try {
        if (!(name.length >= 1 && name.length <= 8)) {
            throw new Error('名字请限制在 1-8 个字符')
        }
        if(!phonenum)
        {
        	throw new Error('号码为空')
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符')
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致')
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像')
        }
    } catch (e) {
        // 注册失败，异步删除上传的头像
        //fs.unlink(req.files.avatar.path)
        req.flash('error', e.message)
        //重定向signup
        return res.redirect('/signup')
    }

    // 明文密码加密
    password = sha1(password)

    // 待写入数据库的用户信息
    let user = {
        name: name,
        phonenum:phonenum,
        password: password,
        avatar: avatar,
    }
    // 用户信息写入数据库
    UserModel.create(user)
        .then(function(result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            user = result.ops[0]
            // 删除密码这种敏感信息，将用户信息存入 session
            delete user.password
            req.session.user = user
            // 写入 flash
            req.flash('success', '注册成功')
            // 跳转到tag页
            res.redirect('/tag')
        })
        .catch(function(e) {
            // 注册失败，异步删除上传的头像
            //fs.unlink(req.files.avatar.path)
            // 用户名被占用则跳回注册页，而不是错误页
            if (e.message.match('duplicate key')) {
                req.flash('error', '用户名已被占用')
                return res.redirect('/signup')
            }
            next(e)
        })
})

module.exports = router