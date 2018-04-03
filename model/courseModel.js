let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    name: String,
    location : String, 
    lat: Number,
    lng: Number,
    description : String,
    phoneNumber : String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

let Courses = mongoose.model('Course', courseSchema);

module.exports = Courses;