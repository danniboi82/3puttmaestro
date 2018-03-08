let Courses = require('../model/courseModel');
let express = require('express');
let router = express.Router();




router.get('/', (req, res)=> {
    res.render('home')
})
//INDEX
router.get('/golfcourses', (req, res) => {
    Courses.find({}, (error, allCourse)=>{
        if(error){
            console.log(error, "YOU FUCKKEDUP");
        } else {
            res.render('golfcourses/index', {golfcourses : allCourse});
            console.log(golfcourses._id, "YAYAY");
        }
    })
});

//CREATE - create new document or 'row' to add to DB
router.post('/golfcourses', (req, res)=> {
    //get data from forms and add to campgrounds array
    let name = req.body.name;
    let description = req.body.description;
    let phoneNumber = req.body.phoneNumber;
    let location = req.body.location;
    let image = req.body.image;

    Courses.create({
        name: name,
        location: location,
        description: description,
        phoneNumber: phoneNumber,
        image: image
    }, (error, saved) => {
        if(error){
            console.log(error, "YOU SCREWED UP!!");
        } else {
            console.log(saved, "data has been SAVED");
        }
    })
    //redirect back to campgrounds page
    res.redirect('/golfcourses')

})

//NEW - with form to add new data to DB
router.get('/golfcourses/new', (req, res) => {
    res.render('golfcourses/newCourse');
    
})

//SHOW - show details about chosen parameter
router.get('/golfcourses/:id', (req, res)=>{
    //find the campground with provided ID 
    let courseId = req.params.id;
    Courses.findById(req.params.id).populate("comments").exec((error, foundCourse) =>{
        if(error){
            console.log(error, "Please try again");
        } else {
            console.log(foundCourse);
            res.render("golfcourses/courseDetails", {course : foundCourse});
        }
    })
})

//EDIT - where user can edit data
router.get('/golfcourses/:id/edit', (req, res)=>{
    let courseId = req.params.id;
    Courses.findById(req.params.id, (error, foundCourse)=>{
        if(error){
            console.log(error, "Please check your code");
        } else {
            console.log(foundCourse);
        }
    })
    res.render("golfcourses/courseEdit");
})

module.exports = router;
