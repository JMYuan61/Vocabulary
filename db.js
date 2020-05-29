var mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/Vocabulary";
mongoose.connect(uri, function(err) {
    if (err) {
        console.log("MongoDB is not connected!");
    } else {
        console.log("Successfully connected to " + uri);
    }
});
module.exports = mongoose;