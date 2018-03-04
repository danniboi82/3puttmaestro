let express = require('express');
let app = express();
let PORT = 3000;
let bodyParser = require('body-parser');

let golfcourses = [
    {name : "Chino Hills", image: "./images/golf1.png"},
    {name : "Big Bear", image: "./images/golf6.png"},
    {name : "Mt Baldy", image: "./images/golf3.png"},
    {name : "Riverside", image: "./images/golf4.png"},
    {name : "FootHills", image: "./images/golf5.png"}
]

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.render('home')
})

app.get('/golfcourses', (req, res) => {
    res.render('golfcourses', {golfcourses : golfcourses});
});

app.post('/golfcourses', (req, res)=> {
    //get data from forms and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;

    golfcourses.push({name: name, image: image})
    //redirect back to campgrounds page
    res.redirect('golfcourses')

})

app.get('/golfcourses/new', (req, res) => {
    res.render('newCourse');
    
})


app.listen(PORT, ()=> {
    console.log("YOU ARE ON PORT 3000")
})