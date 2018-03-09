var mongoose = require("mongoose");
var Course = require("./model/courseModel");
var Comment   = require("./model/commentModel");
 
var data = [
    {
        name: "Los Serranos Golf Course", 
        description: "Los Serranos Golf Club is one of the finest public golf facilities in Southern California, featuring two 18 hole golf courses. Located in Chino Hills, the world class facilities include championship golf, golf school and lessons, and an award winning clubhouse. Our practice areas include a large driving range, chipping greens, sand trap shots and a putting green. Walking into our clubhouse you will experience our love for our community. The Racquet Room Restaurant & Lounge features a full breakfast and lunch menu and the Golf Shop is fully equipped with the most current golf merchandise. Los Serranos Golf Club provides the complete golf experience for the entire family.",
        location: 'Chino Hills, CA',
        phoneNumber: '(909) 888-8888',
        image: "https://res.golfadvisor.com/app/courses/image/preview/65310.jpg",
    },
    {
        name: "Pelican Hill Golf Course",
        description: "When jaw-dropping scenery is par for the course, you’ll need to remind yourself to keep your eye on the ball. But once you find your focus, players of every skill level are rewarded with 36 holes that test your mettle, quicken your pulse and stir your soul. Pelican Hill Golf Club is more than just a round of golf. It’s a two-course feast to make you feel as if golf is your sole reason for being. And from the moment you tee off, it absolutely is.",
        location: 'Newport Beach, CA',
        phoneNumber: '(844) 878-0942', 
        image: "http://www.golfpelicanhill.com/images/home/6.jpg",
    },
    {
        name: "Hidden Valley GC", 
        description: "Hidden Valley Golf Club combines a unique design with unmatched natural beauty, giving players all the elements necessary to ensure the most memorable Orange County and Riverside golf experience. This incredible course contains remarkable changes in elevation, majestic views, and a challenging golf layout designed by architect Casey O'Callaghan. Hidden Valley Golf Club will impress golfers of any skill level. The course's convenient central location near Riverside County and Inland Empire is just one of the many reasons the golf course is becoming a true favorite among avid golfers throughout Southern California.",
        location: 'Norco, CA',
        phoneNumber: '(951) 737-1010',
        image: "http://www.hiddenvalleygolf.com/golf/proto/hiddenvalleygolf3/images/gallery/course/hvgc%20003.jpg",
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