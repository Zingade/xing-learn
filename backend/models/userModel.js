const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    loginID:{type: String, required:true, unique:true, dropDups: true},
    email:{type: String, required:true},
    password:{type:String, required:true},
    phone:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false},
    fees:[{payMethod: {type:String}, amount: {type:String}}],
});

module.exports = mongoose.model("User", userSchema);