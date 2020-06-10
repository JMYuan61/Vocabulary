var mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/Vocabulary";
var option = { useNewUrlParser : true , useUnifiedTopology: true}
mongoose.connect(uri, option, function(err) {
    if (err) {
        console.log("MongoDB is not connected!");
    } else {
        console.log("Successfully connected to " + uri);
    }
});
module.exports = mongoose;