var mongoose = require('mongoose');
var mongoDB = "mongodb://eaar89:password@ds157089.mlab.com:57089/test0";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
