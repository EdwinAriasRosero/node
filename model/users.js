var mongoose = require('mongoose');
var mongodb = require("../code/mongo.js");

var usersSchema = mongoose.Schema({
    name: String,
    surname: String,
    password: String,
    user: String
});

module.exports = mongoose.model("users", usersSchema);