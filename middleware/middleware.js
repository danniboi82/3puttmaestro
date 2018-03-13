let Comment = require('../model/commentModel');
let Course = require('../model/courseModel');

module.exports = {
    isLoggedIn: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    },
    
    commentAuthor: (req, res, next) => {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (error, foundComment) => {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('/');
                }
            })
        } else {
            res.redirect('/signin');
        }
    },

    courseAuthor: (req, res, next) => {
        if (req.isAuthenticated()) {
            Course.findById(req.params.id, (error, foundCourse) => {
                if (foundCourse.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('/');
                }
            })
        } else {
            res.redirect('/signin');
        }
    }
    
}