const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');                      // set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));

var items = [];                                     //1] declare empty array named items

app.get('/', (req, res) => {
    res.render("index", {newlistItems: items});     //5] Renders homepage 
});

app.post('/', (req, res) => {
    var item = req.body.newItem;                //2] Capture form data
    items.push(item);                           //3] pushing form data to items array for every add button click in index.ejs file
    res.redirect('/');                          //4] Redirect you to home page.
});








app.listen(3000, () => {
    console.log("Server is running");
});

