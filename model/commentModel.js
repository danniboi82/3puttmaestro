let mongoose = require('mongoose');

let commentsSchema = new mongoose.Schema({
    text: String,
    author: String, 
    created: {type: Date, default: Date.now}
});

let Comment = mongoose.model("Comment", commentsSchema);



module.exports = Comment;
