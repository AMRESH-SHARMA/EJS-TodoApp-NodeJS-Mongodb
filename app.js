const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');                  // set the view engine to ejs

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {

    var randomNumber = Math.floor(Math.random()*6+1);                 //Random number 1-6

    if (randomNumber <= 3 ) {                  
        msg = "<<<Less than 3"
    } else if (randomNumber > 3 ) {
        msg = ">>>Greater than 3"
    }
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    res.render("index", {randomkey: randomNumber, messagekey: msg, color: randomColor});            //index.ejs file must be inside views folder
                     
});






app.listen(3000, () => {
    console.log("Server is running");
});

