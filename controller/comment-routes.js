let express = require('express');
let router = express.Router();
let Courses = require('../model/courseModel');
let Comment = require('../model/commentModel');


//INDEX
router.get('/golfcourses/:id/comments/new', (req, res) => {
    Courses.findById(req.params.id, (error, course) => {
        if (error) {
            console.log(error, "YOU FUCKKEDUP");
        } else {
            res.render('comments/newComment', {
                course: course
            });
            console.log("HELLO THERE", course);
        }
    })
});

//CREATE - create new document or 'row' to add to DB
router.post('/golfcourses/:id/comments', (req, res) => {

    Courses.findById(req.params.id, (error, course) => {
        if (error) {
            console.log(error);
        } else {
            let author = req.body.author;
            let text = req.body.comment;
            Comment.create({
                author: author,
                text: text
            }, (error, newComment) => {
                if (error) {
                    console.log(error, "Try Again");
                } else {
                    console.log(newComment, "COMMENT SAVED");
                    console.log('==============================================')
                    course.comments.push(newComment);
                    course.save();
                    //redirect back to campgrounds page
                    res.redirect('/golfcourses/' + course._id);
                }
            })
        }

    })
})

//NEW - with form to add new data to DB
router.get('/golfcourses/new', (req, res) => {

})

//SHOW - show details about chosen parameter
router.get('/golfcourses/:id', (req, res) => {
    //find the campground with provided ID 

})

//EDIT - where user can edit data
router.get('/golfcourses/:id/edit', (req, res) => {

})

module.exports = router;