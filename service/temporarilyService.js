var express = require('express')
var router = express.Router()
var Setting = require("../models/setting");

router.post("/temporarily", async function(req, res, next) {

    const date = getDate()

    var number = Number(req.body.number);

    Setting.findOne({
        name: 'temporarily'
    }, async (err, doc) => {
        
        if(err) return handleError(err)

        let upsert = false
        if(doc == null) {
            upsert = true
        } else {
            number += doc.vocabNumber
        }
        
        await Setting.updateOne(
            { name: 'temporarily'}, 
            {
                $set: {
                    name: 'temporarily',
                    vocabNumber: number,
                    toDay: date
                }
            },
            {
                upsert: upsert
            }
        )

        // console.log(upate)
    })

    res.json({
        success: 'success'
    })
})

function getDate(){   
    var d, s = ""                             // 声明变量。
    d = new Date()                            // 创建 Date 对象。
    s += d.getFullYear() + '-'                // 获取年份。
    s += (d.getMonth() + 1) + '-'             // 获取月份。
    s += d.getDate()                          // 获取日。
    return s                                  // 返回日期。
}

module.exports = router