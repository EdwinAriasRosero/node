var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
var users = require("../model/users.js");

let instance;

class Login {
    constructor() {
        this._secretKey = "secret";
        this._landingPage = "/home";
        instance = this;
    }

    login(req, res, next) {
        var user = req.body.user;
        var password = req.body.password;

        users.find({ "user": user, "password": password }, function (err, results) {
            if (err) return console.error(err);

            if (results.length > 0) {
                var token = jwt.sign({ id: results._id }, instance._secretKey);
                res.cookie('token', token);
                res.redirect(instance._landingPage);
            }
            else {
                res.clearCookie('token');
                res.redirect("/login");
            }
        })
    }

    logout(req, res, next) {
        res.clearCookie('token');
        res.redirect("/");
    }

    authorize(req, res, next) {
        try {
            var decoded = jwt.verify(req.cookies.token, instance._secretKey);
            next();
        } catch (err) {
            res.clearCookie('token');
            res.redirect("/login");
        }
    }
}

exports.login2 = Login;
//export default Login;
