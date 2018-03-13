let Comment = require('../model/commentModel');
let Course = require('../model/courseModel');

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Please Sign-in First!!!');
        res.redirect('/signin');
    },

    commentAuthor: (req, res, next) => {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (error, foundComment) => {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You are not worthy");
                    res.redirect('/golfcourses/' + req.params.id);
                }
            })
        } else {
            req.flash("error", "Please sign-in!!!");
            res.redirect('/signin');
        }
    },

    courseAuthor: (req, res, next) => {
        if (req.isAuthenticated()) {
            Course.findById(req.params.id, (error, foundCourse) => {
                if (error) {
                    req.flash("error", "CAMPGROUND NOT FOUND");
                    res.redirect('back');
                } else {
                    if (foundCourse.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "ACCESS DENIED");
                        res.redirect('back');
                    }
                }
            })
        } else {
            req.flash("error", "Please sign-in to edit course");
            res.redirect('/signin');
        }
    }

}