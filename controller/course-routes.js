let Courses = require('../model/courseModel');
let express = require('express');
let router = express.Router();
let middleware = require('../middleware/middleware');

//INDEX
router.get('/', (req, res) => {
    Courses.find({}, (error, allCourse) => {
        if (error) {
            console.log(error, "YOU FUCKKEDUP");
        } else {
            res.render('golfcourses/index', {
                golfcourses: allCourse
            });
            console.log(golfcourses._id, "YAYAY");
        }
    })
});

//CREATE - create new document or 'row' to add to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
    //get data from forms and add to campgrounds array
    let name = req.body.name;
    let description = req.body.description;
    let phoneNumber = req.body.phoneNumber;
    let location = req.body.location;
    let image = req.body.image;
    let author = {
        id: req.user._id,
        username: req.user.username,
    }

    Courses.create({
        name: name,
        location: location,
        description: description,
        phoneNumber: phoneNumber,
        image: image,
        author: author
    }, (error, saved) => {
        if (error) {
            console.log(error, "YOU SCREWED UP!!");
        } else {
            console.log(saved, "data has been SAVED");
            //redirect back to campgrounds page
            res.redirect('/golfcourses');
        }
    });
});

//NEW - with form to add new data to DB
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('golfcourses/newCourse');

});

//SHOW - show details about chosen parameter
router.get('/:id', (req, res) => {
    //find the campground with provided ID 
    let courseId = req.params.id;
    Courses.findById(req.params.id).populate("comments").exec((error, foundCourse) => {
        if (error) {
            console.log(error, "Please try again");
        } else {
            console.log(foundCourse);
            res.render("golfcourses/courseDetails", {
                course: foundCourse
            });
        }
    });
});

//EDIT - where user can edit data
router.get('/:id/edit', middleware.courseAuthor, (req, res) => {
    let courseId = req.params.id;
    Courses.findById(req.params.id, (error, foundCourse) => {
        if (error) {
            console.log(error);
        } else {
            res.render("golfcourses/courseEdit", {
                course: foundCourse
            });
        }
    });
});

//UPDATE -Post edited data back onto DB
router.put('/:id', middleware.courseAuthor, (req, res) => {
    Courses.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        phoneNumber: req.body.phoneNumber,
        image: req.body.image
    }, (error, updatedCourse) => {
        if (error) {
            console.log("cmon man, check your code")
            res.redirect('/signin');
        } else {
            console.log("여기는 코스 route 의 put method")
            res.redirect(`/golfcourses/${updatedCourse._id}`);
        }
    })
})

//Delete
router.delete('/:id', middleware.courseAuthor, (req, res) => {
    Courses.findByIdAndRemove(req.params.id, (error, courseDeleted) => {
        if (error) {
            res.redirect('/');
        } else {
            res.redirect('/golfcourses');
        }
    })
})
module.exports = router;