var express = require("express");
var bodyParser = require("body-parser");
var mongoose =require("mongoose");
var Vocab = require("./models/vocabulary");
var Setting = require("./models/setting");
var swig = require("swig");

var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public", {index: 'index.html'}));
app.engine('html', swig.renderFile);
app.set('views', './public');
app.set('view engine', 'html');
swig.setDefaults({cache: false});


app.post("/add",async function(req,res){
    var vocabulary = req.body.vocabulary;
    var englishMeaning = req.body.englishMeaning;
    var chineseMeaning = req.body.chineseMeaning;
    if (vocabulary === "") {
        res.render('index', { status: '1'});
    } else if (chineseMeaning=== "") {
        res.render('index', { status: '2'});
    } else {
        try{
            var temp = await Vocab.findOne({'vocab':vocabulary});
            if (temp) {
                res.render('index', { status: '3'});
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
                        res.render('index', { status: '0'});
                    }
                });
            }
        }catch(err){
            res.status(400).send(err);
        }
    }
});

app.post("/setting",async function(req,res){
    var number = req.body.number;
    var level1 = req.body.level1;
    var level2 = req.body.level2;
    var level3 = req.body.level3;
    var level4 = req.body.level4;
    var level5 = req.body.level5;
    if (number === "") {
        res.render('index', { errormessage: 'You should fill all blanks!'});
    } else {
        try{
            const setting = await Setting.findOne({'name':'vocabularySetting'});
            if (setting) {
                await Setting.updateOne({'name':'vocabularySetting'},{$set:{
                    level1:level1,
                    level2:level2,
                    level3:level3,
                    level4:level4,
                    level5:level5,
                    vocabNumber:number
                }});
                res.render('setting');
            } else {
                res.status(400).send(err);
            }
        }catch(err){
            res.json({message:err});
        }
    }
});


// app.post("/load",async function(req,res){
//     res.render('learn');
// });


    // wow.sayDialog('你好世界')
    // wow.sayInput('个个都是人才')
    // try{
    //     const user = await User.findOne({'email':email});
    //     console.log(user);
    //     const posts = await Post.find();
    //     var plength = 0;
    //     var classNameArray = [];
    //     var classIdArray=[];
    //     var postNameArray=[];
    //     var count = 0;
    //     //var json = JSON.stringify(user);
    //     if(user){
    //         if (user.password == password) {
    //             // one hour cookie
    //             res.cookie('login',{email:email},{maxAge:1000*60*60});

    //             var lastName = user.lastName;
    //             var firstName = user.firstName;
    //             if(posts){
    //                 plength = posts.length;
    //                 for (var i = 0; i < 5; i++){
    //                     if(plength>i){
    //                         count++;
    //                         classNameArray.push(posts[i].className);
    //                         classIdArray.push(posts[i].classId);
    //                         postNameArray.push(posts[i].postby);
    //                     }else{
    //                         classNameArray.push(" ");
    //                         classIdArray.push(" ");
    //                         postNameArray.push(" ");
    //                     }
    //                 }
    //             }
    //             res.render('index',{username:firstName+"_"+lastName, count:count,classNameArray:classNameArray, classIdArray:classIdArray, postNameArray:postNameArray, page:1, total:plength});
    //         }else{
    //             res.render('login');
    //         }
    //     } else {
    //         res.render('login', { errormessage: 'Account does not exist'});
    //         // res.render('login');
    //     }  
    // }catch(err){
    //     res.json({message:err});
    // }
//     var documentsToMove = db.collectionA.find({});
//     documentsToMove.forEach(function(doc) {
//         db.collectionB.insert(doc);
//         db.collectionA.remove(doc);
//     });

app.listen(port);