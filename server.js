let express = require('express');
let app = express();
// let PORT = 3000;
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let seedDB = require('./seeds');
let courseRoutes = require("./controller/course-routes");
let commentRoutes = require("./controller/comment-routes");
let userRoutes = require("./controller/user-routes");
let localStrategy = require('passport-local');
let passport = require('passport');
let expressSession = require("express-session");
let User = require('./model/userModel');
let methodOverride = require('method-override');
let flash = require('connect-flash');


// seedDB(); //Seed the database

// mongoose.connect("mongodb://localhost/golfCourses");

mongoose.connect("mongodb://heroku_1xgmdxx6:b7651sla472ico5mmf37g5pe8e@ds113169.mlab.com:13169/heroku_1xgmdxx6");
app.set('view engine', 'ejs');
app.use(flash());
app.use(expressSession({
    secret: "Bori is lovely",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});




app.use('/', userRoutes);
app.use('/golfcourses', courseRoutes);
app.use('/golfcourses/:id/comments', commentRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("YOU ARE ON PORT " + JSON.stringify(process.env));
})