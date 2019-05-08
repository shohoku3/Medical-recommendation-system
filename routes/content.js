const express=require('express')
const router=express.Router()

router.get('', function (req, res) {
	res.render('content')
})

module.exports=router

//生成express.Router实例 并导出
