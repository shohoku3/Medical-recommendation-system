const express = require('express')
const router = express.Router()
router.post('/', function(req, res) {
    var province = req.fields.province
    var selectData = function(title) {
        var MongoClient = require('mongodb').MongoClient;
        var url = 'mongodb://localhost:27017/medical';
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var whereStr = { 'title': title }
            db.collection("陕西").find(whereStr).toArray(function(err, result) {
                if (err) throw err;
                if (result.toString() == '') {
                    console.log('default')
                    return false
                } else {
                    console.log(result)
                    return true
                }
                db.close()
            })
        });
    }
    var json = req.fields.value
    var hosObj = eval(json)
    for (var key in hosObj) {
        var title = hosObj[key].title.toString()
        selectData(title)
    }
})


router.get('/', function(req, res) {
    res.render('content',hosObj);
})

module.exports = router

//生成express.Router实例 并导出