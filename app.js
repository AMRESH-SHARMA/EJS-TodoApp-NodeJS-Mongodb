const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');                      // set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));                  //Serve  css file

var items = [];                                     //1] declare empty array named items

app.get('/', (req, res) => {

    //Get day, date
    var today = new Date();
    var options = { weekday: "long", day: "numeric", month: "long"};
    var day = today.toLocaleDateString("en-us", options);

    res.render("index", {kindofDay: day, newlistItems: items});     //5] Renders homepage 
});

app.post('/', (req, res) => {
    var item = req.body.newItem;                //2] Capture form data
    items.push(item);                           //3] pushing form data to items array for every add button click in index.ejs file
    res.redirect('/');                          //4] Redirect you to home page.
});








app.listen(3000, () => {
    console.log("Server is running");
});

