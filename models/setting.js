var db = require("../db");

var settingSchema = db.model("setting", {
    name:                String,
    level1:              Number,
    level2:              Number,
    level3:              Number,
    level4:              Number,
    level5:              Number,
    level6:              Number,
    level7:              Number,
    level8:              Number,
    level9:              Number,
    level10:             Number,
    vocabNumber:         Number,
    toDay:               String
});

module.exports = settingSchema;