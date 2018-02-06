var express = require("express");
var app = express();
var multer = require('multer');
var upload = multer({ dest: "public/uploads/" });

app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/loboncoin");


var announceSchema = new mongoose.Schema({
  id: String,
  title_name : String,
  photo_url: ImageData,
  nick_name: String,
  price: Number,
  city: String,
  description: String,
  phone_number: Number,
  user_email: String,
  created: { type: Date, default: Date.now }
});

var Announces = mongoose.model("Announces", announcesSchema);

announces.save(function(err, obj) {
  if (err) {
    // something went wrong
    console.log(err);
  } else {
    console.log("we just saved the new Announce " + obj.title_name);

    Announces.find({}, function(err, students) {
      if (!err) {
        console.log(announces);
      }
    });
  }
});

var announces = [];
var idCounter = 0;


/* Voir la liste de tous les étudiants */
app.get("/", function(req, res) {
  res.render("home.ejs",{
      announces: announces
  });
  
});

app.get('/deposer', function (req, res) {
  res.render('createAnnounce.ejs'),
  announce = announces;
});

app.post('/deposer', upload.single('photo_url'), function (req, res) {
  var title_name = req.body.title_name;
  var photo_url = req.file.filename;
  var nick_name = req.body.nick_name;
  var price = req.body.price;
  var city = req.body.city;
  var description = req.body.description;
  var phone_number = req.body.phone_number;
  var user_email = req.body.user_email;
 
  var newAnnounce = {
    id: idCounter,
    title_name : title_name,
    photo_url: photo_url,
    nick_name: nick_name,
    price: price,
    city: city,
    description: description,
    phone_number: phone_number,
    user_email: user_email
  };
  idCounter++;

  announces.push(newAnnounce); 
  res.redirect('/annonce/' + newAnnounce.id);
});

app.get('/annonce/:id', function (req, res) {

  var id = parseInt(req.params.id);

  for (var i = 0; i < announces.length; i++) {
    if (announces[i].id === id) {
      return res.render('viewAnnounce.ejs', {  
        id: announces[i].id,
        title_name: announces[i].title_name,
        photo_url: announces[i].photo_url,
        nick_name: announces[i].nick_name,
        price: announces[i].price,
        city: announces[i].city,
        description: announces[i].description,
        phone_number:announces[i].phone_number,
        user_email:announces[i].user_email
       
      });
    }
  }
  return res.status(404).send('Not found');
});

app.listen(3000, function () {
  console.log('Server started');
});