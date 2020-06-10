var express = require('express')
var router = express.Router()
var Setting = require("../models/setting");

router.get("/setting", async function(req, res, next) {

    let result = await Setting.findOne({'name':'vocabularySetting'}, {_id: 0})
    
    if(result == null) {

        result = {
            vocabNumber: 0,
            level1: 0,
            level2: 0,
            level3: 0,
            level4: 0,
            level5: 0
        }
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
    req.body.vocabNumber = number
    
    let result = { status:'0', message: 'You should fill all blanks!', data: req.body }

    if (number === "") {
        res.render('setting',  result);
    } else {

        try{

            await Setting.updateOne(
                {'name':'vocabularySetting'},
                {
                    $set:{
                        level1:level1,
                        level2:level2,
                        level3:level3,
                        level4:level4,
                        level5:level5,
                        vocabNumber:number
                    }
                },
                {
                    upsert: true
                }
            );
            result.message = 'successfull'

            res.render('setting', result);

        } catch(err) {
            result.message = err
            res.json('setting',result);
        }
    }
})

module.exports = router