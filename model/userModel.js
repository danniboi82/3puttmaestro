let mongoose = require('mongoose');
let passportMongoose = require("passport-local-mongoose");

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // comments:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Comment"
    //     }
    // ]
})

userSchema.plugin(passportMongoose);


module.exports =  mongoose.model('User', userSchema);
