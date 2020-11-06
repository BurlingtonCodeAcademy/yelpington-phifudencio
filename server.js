//variable declaration
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;

//serv the public folder
app.use(express.static("public"));

//Arrays with the restaurants name
let restArray = ["american-flatbread", "city-market", "farmhouse-grill", "mr-mikes", "the-friendly-toast", "the-skinny-pancake"]

//get for the rest page that gets the id of the restaurant to load the restaurant page.
app.get('/rest-page/:id', (req,res) => {
  if(restArray.includes(req.params.id)){
  res.sendFile(path.resolve(`public/rest-page.html`))
  }else{
    res.send("Nothing Here!")
  }
})

//listen to the port
app.listen(port, () => console.log(`This server is running on port : ${port}`));
