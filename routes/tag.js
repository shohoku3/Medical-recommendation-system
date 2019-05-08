const express = require('express')
const router = express.Router()
const UserTagModel = require('../models/userTag')

//用户标签模型
//const UserTagModel=require()

router.get('/', function (req, res,next) {
  res.render('tag')
  console.log(req.session.user)
})

router.post('/', function (req, res,next) {
	const name=req.session.user.name
	var prefences = new Array()
	prefences =req.fields.prefence.toString()
	try{
		if(prefences===undefined)
		{
			throw new Error('未选择，请至少选择一个')
		}
	}
	catch(e){
		//提交失败
		req.flash('error',e.message)
		return res.redirect('/tag')
	}
	//待写入数据库数据
	let tag ={
		name:name,
		prefences:prefences
	}
	//用户信息写入数据库
	 UserTagModel.create(tag)
        .then(function(result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            tag = result.ops[0]
            // 写入 flash
            req.flash('success', '提交完成')
            // 跳转到tag页
            res.redirect('/index')
        })
})

module.exports = router