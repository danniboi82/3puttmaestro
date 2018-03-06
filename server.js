let express = require('express');
let app = express();
let PORT = 3000;
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/golfCourses");

let courseSchema = new mongoose.Schema({
    name: String,
    location : String, 
    description : String,
    phoneNumber : String,
    image: String
})

let Courses = mongoose.model('Course', courseSchema);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.render('home')
})

//INDEX
app.get('/golfcourses', (req, res) => {
    Courses.find({}, (error, allCourse)=>{
        if(error){
            console.log(error, "YOU FUCKKEDUP");
        } else {
            res.render('index', {golfcourses : allCourse});
            console.log(golfcourses._id, "YAYAY");
        }
    })
});

//CREATE - create new document or 'row' to add to DB
app.post('/golfcourses', (req, res)=> {
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
app.get('/golfcourses/new', (req, res) => {
    res.render('newCourse');
    
})

//SHOW - show details about chosen parameter
app.get('/golfcourses/:id', (req, res)=>{
    //find the campground with provided ID 
    let courseId = req.params.id;
    Courses.findById(req.params.id, (error, foundCourse) =>{
        if(error){
            console.log(error, "Please try again");
        } else {
            res.render("courseDetails", {course : foundCourse});
        }
    })
})


app.listen(PORT, ()=> {
    console.log("YOU ARE ON PORT 3000")
})