var mongoose = require("mongoose");
var Course = require("./model/courseModel");
var Comment   = require("./model/commentModel");
 
var data = [
    {
        name: "Cloud's Rest", 
        description: "A",
        location: '',
        phoneNumber: '',
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    },
    {
        name: "Desert Mesa",
        description: "B",
        location: '',
        phoneNumber: '', 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    },
    {
        name: "Canyon Floor", 
        description: "C",
        location: '',
        phoneNumber: '',
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    }
]
 
function seedDB(){
   //Remove all Courses
   Course.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Courses!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few Courses
            data.forEach(function(seed){
                Course.create(seed, function(err, course){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a course");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    course.comments.push(comment._id);
                                    course.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;