var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');

var students = [];

app.post("/add-student", function(req, res) {
  // Pour afficher les données reçues :
  console.log(req.body);

  // Pour ajouter un student
  var newStudent = req.body.studentName;
  students.push(newStudent);
  res.json(students);
});


app.get("/", function(req, res) {
  res.send("<h1>Welcome to the homepage</h1>");
});

app.listen(3000, "localhost", function() {
  console.log("Server is listening...");
});