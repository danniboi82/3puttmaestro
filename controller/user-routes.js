let express = require('express');
let router = express.Router();
let User = require('../model/userModel');
let passport = require('passport');
let passportLocal = require('passport-local');
let passportMongoose = require('passport-local-mongoose');


router.get('/', (req, res)=> {
    res.render('home')
});

//Sign-up GET POST ROUTE
router.get('/signup', (req, res)=>{
    res.render('authentication/signup')
})

router.post('/signup', (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    //create new user data in mongoose but password has to be encrypted via passport
    User.register(new User({
        username: username,
    }), password, (error, newUser)=>{
        if(error){
            console.log(error, "CHECK ERROR AND TRY AGAIN!!");
            return res.render('authentication/signup', {error: error.message})
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash('success', `Hello ${req.body.username}, You've signed up Successfully!`)
            res.redirect('/golfcourses');
        })
    })
})

//Sign-in GET POST ROUTE
router.get('/signin', (req, res)=>{
    res.render('authentication/signin');
})

router.post('/signin', passport.authenticate("local", {
    successRedirect: "/golfcourses",
    failureRedirect: "signin"}),
    (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    User.authenticate();
})

//Sign-out GET POST ROUTE

router.get('/signout', (req, res)=> {
    req.logout();
    req.flash("success", "You are logged out now");
    res.redirect('/');
})

module.exports = router;