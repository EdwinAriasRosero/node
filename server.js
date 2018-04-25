var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

//internal
//var login = require("./code/login.js").loginModule;
var login2 = require("./code/login2.js").login2;
var a = new login2();
//import Login2 from "./code/login2.js";

//initialize
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//pages
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/pages/index.html'));
    console.log(__dirname);
    //res.send("Hola");
});

app.get("/index", function(req, res){
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get("/home", a.authorize, function(req, res){
    res.sendFile(path.join(__dirname + '/pages/home.html'));
});

app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.post("/login", function(req, res, next){
    a.login(req, res, next);
});

app.listen(5000, function(){
    console.log("working...");
});