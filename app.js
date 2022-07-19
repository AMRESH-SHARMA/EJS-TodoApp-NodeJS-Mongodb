const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");                          //To capitalize custom url

const app = express();

app.set('view engine', 'ejs');                      // set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));                  //Serve  css file

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});     //Creates and opens todolist DB

//_____________________________________________________________Item Schema and model

const itemsSchema = {                                        //db's Schema declared
    name: String
};

const Item = mongoose.model("Item", itemsSchema);           //db's model declared, now use various CRUD methods of model

//_________________________________________________________________________List Schema, model
const ListSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", ListSchema);

//__________________________________________________________Default items to insert into list, if found empty

const item1  = new Item({
    name: "Welcome to your todolist!"
});

const item2  = new Item({
    name: "Hit the + button to add a new item."
});

const item3  = new Item({
    name: "<--Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];



//FIRST HOME PAGE__________________________________________________________TO RENDER PERSONAL LIST
app.get('/', (req, res) => {

    Item.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("SUCCESSFULLY ITEM ADDED TO DB");
                }
            });
            res.redirect('/');
        } else {
            //Renders array of found items
            res.render("listpage", {listTitle: "Home", newlistItems: foundItems, url: "/"});     
        }
       
    });   
});

app.post('/', (req, res) => {
                
    const item = new Item({
        name: req.body.newItem
    });
    item.save();                
    res.redirect('/');                          
});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox ;
    const listName = req.body.listName;

    if (listName === "Home") {
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if(!err) {
                console.log("SUCCESSFULLY DELETED CHECKED ITEM");
            } else {console.log(err)}
        });
        res.redirect('/');  
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId }}}, (err, foundList) => {
            if (!err) {
                res.redirect('/' + listName);
            }
        });
    };

});


//________________________________________________________________________TO RENDER CUSTOM LIST

app.get("/:customListName", (req, res) => {             //NOW app.get is dynamic route, customListName is variable
    const customListName = _.capitalize(req.params.customListName);  //Using lodash 

    List.findOne({name:customListName}, (err, foundList) =>{
        if(!err) {
            if (!foundList) {
                //Create new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect('/' + customListName);
            } else {
                //show existing list
                res.render("listpage", {listTitle: foundList.name, newlistItems: foundList.items, url: "/" + customListName});
            }
        }
    });  
});

app.post("/:customListName", (req, res) => {
    const postUrl = req.params.customListName
    const itemName = req.body.newItem

    const item = new Item({
        name: itemName
    });

    List.findOne({name:postUrl}, (err, foundList) =>{
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + postUrl);
    });
});







app.listen(3000, () => {
    console.log("SERVER IS RUNNING");
});

