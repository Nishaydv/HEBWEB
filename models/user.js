var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

 
var User = new Schema({
    name: {
      type: String,
        default: ''
    },
    penname: {
      type: String,
        default: ''
    },
    collegename: {
        type: String,
          default: ''
    },
    collegeId: {
        type: String,
          default: ''
    },
    email: {
        type: String,
          default: ''
    },
    phonenumber: {
        type: String,
          default: ''
    },
    facebookId: String,
     
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);