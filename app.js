const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');                      // set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));                  //Serve  css file

let items = [];                                     //1] declare empty array for personal list
let workItems = [];                                 //declare empty array for work list

//________________________________________________________________________TO RENDER WORK LIST

app.get('/', (req, res) => {
    res.render("listpage", {listTitle: "Personal list", newlistItems: items, url: "/"});     //5] Renders homepage 
});

app.post('/', (req, res) => {
    let item = req.body.newItem;                //2] Capture form data
    items.push(item);                           //3] pushing form data to items array for every add button click in index.ejs file
    res.redirect('/');                          //4] Redirect you to home page.
});



//________________________________________________________________________TO RENDER WORK LIST

app.get("/work", (req, res) => {
    res.render("listpage", {listTitle: "Work list", newlistItems: workItems, url: "/work"});
});

app.post("/work", (req, res) => {
    let item = req.body.newItem; 
    workItems.push(item);
    res.redirect('/work');
});







app.listen(3000, () => {
    console.log("Server is running");
});

