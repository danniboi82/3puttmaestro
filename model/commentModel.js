let mongoose = require('mongoose');

let commentsSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }, 
    created: {type: Date, default: Date.now}
});

let Comment = mongoose.model("Comment", commentsSchema);



module.exports = Comment;
