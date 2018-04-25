var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var users = require("../model/users.js");

const secretKey = "secret";
const landingPage = "/home";

var loginModule = new Object();

loginModule.login = function (req, res, next) {
    var user = req.body.user;
    var password = req.body.password;

    users.find({ "user": user, "password": password }, function (err, results) {
        if (err) return console.error(err);

        if (results.length > 0) {
            var token = jwt.sign({ id: results._id }, secretKey);
            res.cookie('token', token);
            res.redirect(landingPage);
        }
        else {
            res.clearCookie('token');
            res.redirect("/login");
        }
    })
};

loginModule.logout = function (req, res, next) {
    res.clearCookie('token');
    res.redirect("/");
};

loginModule.authorize = function (req, res, next) {
    try {
        var decoded = jwt.verify(req.cookies.token, secretKey);
        next();
    } catch (err) {
        res.clearCookie('token');
        res.redirect("/login");
    }
};

exports.loginModule = loginModule;