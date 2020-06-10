var express = require("express");
var bodyParser = require("body-parser");
var mongoose =require("mongoose");


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

/* --- codeing --  index */

let index = require('./service/indexService');
let learn = require('./service/learnService');
let setting = require('./service/settingService');
let temporarily = require('./service/temporarilyService');

app.use('/', ...[index, learn, setting, temporarily])

/* --- codeing -- learn */



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