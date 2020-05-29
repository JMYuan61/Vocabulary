var db = require("../db");

var vocabSchema = db.model("vocabularies", {
    vocab:               String,
    englishMeaning:      String,
    chineseMeaning:      String,
    level:               Number,
    context:             [String]
});

module.exports = vocabSchema;