const express = require('express')
const router = express.Router()

const HosinfoModel = require('../models/hosinfo')

router.get('/', function(req, res) {
    res.render('content');
})
router.post('/', function(req, res) {
    var json = req.fields.value
    var hosObj = eval(json)
    for (var key in hosObj) {
        var jsonData = JSON.stringify(hosObj[key]) // 转成JSON字符串
        var jsonresult = JSON.parse(jsonData) //将数据转换为 JavaScript 对象
        //console.log(jsonresult)
        try {
            var uid = jsonresult.uid;
            var title = jsonresult.title;
            var detailUrl = jsonresult.detailUrl;
            var address = jsonresult.address;
            if(jsonresult.hasOwnProperty('phoneNumber')){
                 var phoneNumber = jsonresult.phoneNumber.toString();
            }
            else
            {
                var phoneNumber='null';
            }
            if(jsonresult.hasOwnProperty('tags')){
                var tags=jsonresult.tags.toString();
            }
            else
            {
                var tags='null';
            }
            //待写入数据库信息
            let hosinfo = {
                uid: uid,
                title: title,
                detailUrl: detailUrl,
                address:address,
                phoneNumber:phoneNumber,
                tags: tags
            }
            //写入
            HosinfoModel.create(hosinfo)
                .then(function(result) {
                    hosinfo = result.ops[0]
                    console.log('写入 success')
                })
        } catch (e) {
            if (e.message.match('duplicate key')) {
                console.log(e)
            }
            else
            {
                console.log(e)
            }
        }
    }

})
module.exports = router

//生成express.Router实例 并导出