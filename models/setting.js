var db = require("../db");

var settingSchema = db.model("setting", {
    name:                String,
    level1:              Number,
    level2:              Number,
    level3:              Number,
    level4:              Number,
    level5:              Number,
    vocabNumber:         Number
});

module.exports = settingSchema;