const express = require('express')
const app = express.Router()
var Setting = require("../models/setting");
var Vocab = require("../models/vocabulary");

app.get('/learn', async function(req, res) {

    if("is_get" in req.query) {
        res.json(await getLearnData())
    } else {
        res.render('learn', {learnData:{}})
    }

    
})

getLearnData = async () => {

    let settingData = await Setting.findOne({name: 'vocabularySetting'},{_id: 0}).exec()

    const date = getDate()
    const Temporarily = await Setting.findOne({name: 'temporarily', 'toDay': date },{_id: 0}).exec()
    // console.log(Temporarily) 

    console.log(settingData.vocabNumber)

    if(Temporarily !== null) {
        settingData.vocabNumber += Temporarily.vocabNumber
    }
    console.log('Temporarily', Temporarily);
    
    console.log(settingData.vocabNumber)

    const count = await Vocab.countDocuments({ toDay: date}).exec()

    let vocabNumber = settingData.vocabNumber - count
    
    if (!vocabNumber) {
        return []
    }

    let vocabData = await Vocab
                    .find({level:0})
                    .sort({ toDay: 'asc'})
                    .limit(vocabNumber)
                    .exec()

    // return result

    const ltData  = await getLearnDataLt(vocabData, vocabNumber, settingData)

    return vocabData.concat(ltData).sort(function(){ return (0.5-Math.random());})
    
}

prob = async () => {
    const date = getDate()
    const group = await Vocab.aggregate([
        {
            $match : {
                toDay: {$ne: date}
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

        return result
    })
    
    // console.log(group)

    return group

}

/**
 * Less than reads the data
 */
getLearnDataLt = async (vocabData, vocabNumber, settingData) => {

    let result = []
    
    if(vocabData.length < vocabNumber) {

        let allLevel = await getAllot(vocabNumber, vocabData, settingData)

        const date = getDate()

        for(let i = 1; i< 6; i++) {
            let levelData = await getLimitLevel(allLevel['level'+ i], date, i)
            result = result.concat(levelData)
        }

    }

    return result
}

getAllot = async (vocabNumber, vocabData, settingData) => {

    const group = await prob()

    const limit = vocabNumber - vocabData.length

    let limitLevel = {}

    let all = {number: 0}

    console.log(group)
    

    for(let i = 1; i < 6; i++) {
        
        let count = Math.round(limit * settingData['level'+i] / 100)
        
        limitLevel['level'+ i] = count

        if(i in group) {

            group[i] = levelSub(group[i], count, all)

        } else {
            limitLevel['level'+ i] = 0
        }

    }
    // console.log(limitLevel);
    // console.log(all);
    // console.log(limit);

    levelSurplus(limit, all, group, limitLevel)


    // console.log(limitLevel);
    // console.log(group);
    // console.log(all);
    // console.log(limit);


    return limitLevel

}

levelSurplus = (limit, all, group, limitLevel) => {
    let new_i = limit - all.number

    if(new_i <= 0) {
        return 
    }

    for(let key in group) {

        if (!group[key]) {
            continue;
        }
        
        let sum = 0
     
        if((new_i - group[key]) >= 0) {
            sum = group[key]
        } else {
            sum = new_i
        }

        new_i -= sum
        
        limitLevel['level'+key] += sum
        all.number += sum
        group[key] -= sum

        if(new_i <= 0) {
            break;
        }
        
    }
}

levelSub = (group, count, all) => {

    let result = Number(group) - Number(count)
    // console.log(all)
    if(result >= 0) {
        all.number +=  Number(count)
        return result
    } else {
        all.number += Number(group)
        return 0
    }
    
    
}


getLimitLevel = async (limit, date, level) => {

    if(!limit) {
        return []
    }

    let ltData = await Vocab.find({
        level: level,
        toDay: {
            $ne: date
        }
    })
    .sort({ _id: 'desc', level: 1})
    .limit(limit)
    .exec()

    return ltData
}


app.post('/learn', async (req, res, next) => {

    let postData = req.body
    const date = getDate()

    const updateResult = await Vocab.updateOne(
        {
            '_id': postData._id,
            toDay: { $ne: date }
        },
        {
            $set:{
                level: postData.level,
                toDay: date
            }
        }
    )

    // console.log(updateResult)
    res.jsonp({})
})


function getDate(){   
    var d, s = ""                             // 声明变量。
    d = new Date()                            // 创建 Date 对象。
    s += d.getFullYear() + '-'                // 获取年份。
    s += (d.getMonth() + 1) + '-'             // 获取月份。
    s += d.getDate()                          // 获取日。
    return s                                  // 返回日期。
}

module.exports = app