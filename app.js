const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let port = 80;

// For serving static file
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// Define Mongoose Schema 

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String, 
  email: String,
  address: String,
  desc: String
});

const Contact = mongoose.model('Contact', ContactSchema);


// Set the template engine as per pug
app.set("view engine", "pug");
// Set the view directory
app.set("views", path.join(__dirname, "views"));

// Endpoints
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact", params);
});


app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to the Database.")
  }).catch(()=>{
    res.status(400).send("Items was not saved succesfully to the Database.")
  })
  // res.status(200).render("contact");
});

// Start the server.
app.listen(port, () => {
  console.log(`THe appliaction started sucessfully on port ${port}`);
});
