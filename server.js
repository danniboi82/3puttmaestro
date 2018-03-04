let express = require('express');
let app = express();
let PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=> {
    res.render('home')
})

app.get('/golfcourses', (req, res) => {
    let golfcourses = [
        {name : "Chino Hills", image: "./images/golf1.png"},
        {name : "Big Bear", image: "./images/golf6.png"},
        {name : "Mt Baldy", image: "./images/golf3.png"},
        {name : "Riverside", image: "./images/golf4.png"},
        {name : "FootHills", image: "./images/golf5.png"}
    ]
    res.render('golfcourses', {golfcourses : golfcourses});
})


app.listen(PORT, ()=> {
    console.log("YOU ARE ON PORT 3000")
})