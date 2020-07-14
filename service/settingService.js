var express = require('express')
var router = express.Router()
var Setting = require("../models/setting");
var Vocab = require("../models/vocabulary");

function getDate(){   
    var d, s = ""                             // 声明变量。
    d = new Date()                            // 创建 Date 对象。
    s += d.getFullYear() + '-'                // 获取年份。
    s += (d.getMonth() + 1) + '-'             // 获取月份。
    s += d.getDate()                          // 获取日。
    return s                                  // 返回日期。
}

getNumber = async () => {
    const date = getDate()
    const group = await Vocab.aggregate([
        {
            $match : {
                toDay: {
                    $ne: date
                }
            },
        },
        {
            $group : {
                _id : "$level",
                level_count : {
                    $sum : 1
                }
            }
        }
    ])
    .sort({_id: 1})
    .then((resolve, reject) => {
        let result = {}
        for(let key in resolve) {
            if(resolve[key]._id) {
                result[resolve[key]._id] = resolve[key].level_count
            }
        }
        for(let i = 0; i < 11; i++) {
            if (!result[i]) {
                result[i] = 0;
            }
        }
        return result
    })
    return group
}

router.get("/setting", async function(req, res, next) {

    let prob = await Setting.findOne({'name':'vocabularySetting'}, {_id: 0})
    const group = await getNumber()
    console.log(prob)

    
    if(prob == null) {

        prob = {
            vocabNumber: 0,
            level1: 0,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0,
            level6: 0,
            level7: 0,
            level8: 0,
            level9: 0,
            level10: 0
        }
    }

    stats = {
        count0:group['0'],
        count1:group['1'],
        count2:group['2'],
        count3:group['3'],
        count4:group['4'],
        count5:group['5'],
        count6:group['6'],
        count7:group['7'],
        count8:group['8'],
        count9:group['9'],
        count10:group['10']
    }
    console.log(stats)
    result = {
        prob:prob,
        stats:stats
    }

    res.render('setting', { status:'0', message: "", data: result});
})

router.post("/setting",async function(req,res){

    var number = Number(req.body.number);
    var level1 = Number(req.body.level1);
    var level2 = Number(req.body.level2);
    var level3 = Number(req.body.level3);
    var level4 = Number(req.body.level4);
    var level5 = Number(req.body.level5);
    var level6 = Number(req.body.level6);
    var level7 = Number(req.body.level7);
    var level8 = Number(req.body.level8);
    var level9 = Number(req.body.level9);
    var level10 = Number(req.body.level10);
    req.body.vocabNumber = number;
    
    let result = { status:'0', message: 'You should fill all blanks!', data: req.body }

    if (number === "") {
        res.render('setting',  result);
    } 
    else {

        try{
            // console.log(Number(req.body.level6));
            // console.log(level7);
            // console.log(level8);
            // console.log(level9);
            // console.log(level10);
            await Setting.updateOne(
                {'name':'vocabularySetting'},
                {
                    $set:{
                        level1:level1,
                        level2:level2,
                        level3:level3,
                        level4:level4,
                        level5:level5,
                        level6:level6,
                        level7:level7,
                        level8:level8,
                        level9:level9,
                        level10:level10,
                        vocabNumber:number
                    }
                },
                {
                    upsert: true
                }
            );
            // result.message = 'successfull'

            // res.render('setting', result);

        } catch(err) {
            result.message = err
            res.json('setting',result);
        }
    }
})

module.exports = router