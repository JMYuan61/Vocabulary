var express = require('express')
var router = express.Router()
var Vocab = require("../models/vocabulary")

router.get("/index", async function(req, res, next) {
    res.render('index', {status:'0', message: ""});
})

router.post("/index",async function(req,res) {
    var vocabulary = req.body.vocabulary;
    var englishMeaning = req.body.englishMeaning;
    var chineseMeaning = req.body.chineseMeaning;

    let result = { status: 1 , message: ""}

    if (vocabulary === "") {
        result.message = 'Words cannot be blank'
        res.render('index', result);
    } else if (chineseMeaning === "") {
        result.message = 'Chinese meaning cannot be blank'
        res.render('index', result);
    } else {
        try{
            var temp = await Vocab.findOne({'vocab':vocabulary});
            if (temp) {
                result.message = 'Words already exist'
                res.render('index', result);
            } else {
                var vocab = new Vocab({
                    vocab:vocabulary,
                    englishMeaning:englishMeaning,
                    chineseMeaning:chineseMeaning,
                    level:0
                });
                vocab.save(function(err, stu) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        result.message = 'successfull'
                        res.render('index', result);
                    }
                });
            }
        }catch(err){
            res.status(400).send(err);
        }
    }
});

module.exports = router