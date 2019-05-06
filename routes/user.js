const express=require('express')
const router=express.Router()

router.get('/:name', function (req, res) {
  res.render('user',{
  	name:req.params.name
  })
})

module.exports=router

//生成express.Router实例 并导出
