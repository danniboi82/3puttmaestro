let express = require('express');
let router = express.Router({mergeParams: true});
let Courses = require('../model/courseModel');
let Comment = require('../model/commentModel');
let middleware = require('../middleware/middleware');

//NEW - create a form on path below where it will gather input(data) and use to create below on POST
router.get('/new', middleware.isLoggedIn, (req, res) => {
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

//CREATE - create new document or 'row' to add to DB & redirect to details page
router.post('/', middleware.isLoggedIn, (req, res) => {
    Courses.findById(req.params.id, (error, course) => {
        if (error) {
            console.log(error);
            res.redirect('/golfcourses')
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
                    console.log(req.user.username);
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //save comment
                    newComment.save();
                    course.comments.push(newComment);
                    course.save();
                    //redirect back to campgrounds page
                    res.redirect('/golfcourses/' + course._id);
                };
            });
        };

    });
});


//EDIT - where user can edit data
router.get('/:comment_id/edit', middleware.commentAuthor, (req, res) => {
    console.log("=================");
    console.log(req.params);
    console.log("=================");
    let id = req.params.comment_id;
    let comment = req.body.comment;
    Comment.findById(id, (error, foundComment)=>{
        if (error){
            console.log("FAIL");
        } else {
            console.log("YAY!");
            res.render("comments/editComment", {course_id: req.params.id, comment : foundComment})
        }
    })
})

//UPDATE 
router.put('/:comment_id', middleware.commentAuthor, (req, res)=>{
    let revisedComment = req.body.comment;
    Comment.findByIdAndUpdate(req.params.comment_id, {text: revisedComment}, (error, updatedComment)=>{
        if(error){
            console.log(error);
        } else {
            res.redirect(`/golfcourses/${req.params.id}`)
        }
    })
})

//DELETE
router.delete('/:comment_id', middleware.commentAuthor, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (error, commentDeleted)=>{
        if(error){
            res.redirect(`/golfcourses/${req.params.id}`)
        } else {
            res.redirect(`/golfcourses/${req.params.id}`)
        }
    })
})

module.exports = router;