//variable declaration
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;

//serv the public folder
app.use(express.static("public"));

//This loads the index html
app.get("/public/:id", (req, res) => {
  res.sendFile(path.resolve(`public/index.html`));
});


//This was supposed to load the page for each restaurant.... {IS NOT WORKING AND I COUNDT FIGURE OUT WHY the page is not even taking the CSS STYLE.}
app.get('/rest-page/:id', (req,res) => {
  res.sendFile(path.resolve(`public/rest-page.html`))
})

//listen to the port
app.listen(port, () => console.log(`This server is running on port : ${port}`));
