let express = require('express');
let app = express();
let PORT = 3000;
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let seedDB = require('./seeds');
let courseRoutes = require("./controller/course-routes");
let commentRoutes = require("./controller/comment-routes");
seedDB();

mongoose.connect("mongodb://localhost/golfCourses");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));



app.use(courseRoutes);
app.use(commentRoutes);

app.listen(PORT, ()=> {
    console.log("YOU ARE ON PORT 3000")
})