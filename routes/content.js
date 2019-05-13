const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.render('content');
})
router.post('/', function(req, res) {
    var province=req.fields.province
    if(province!=undefined){
        
    }
    var json = req.fields.value
    var hosObj = eval(json)
    for (var key in hosObj) {
        var jsonData = JSON.stringify(hosObj[key]) // 转成JSON字符串
        var jsonresult = JSON.parse(jsonData) //将数据转换为 JavaScript 对象
        try {
            var uid = jsonresult.uid;
            var title = jsonresult.title;
            console.log(title)
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