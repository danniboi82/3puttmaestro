let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    name: String,
    location : String, 
    description : String,
    phoneNumber : String,
    image: String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

let Courses = mongoose.model('Course', courseSchema);

module.exports = Courses;