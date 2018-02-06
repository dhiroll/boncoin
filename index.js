var express = require("express");
var app = express();
var multer = require('multer');
var upload = multer({ dest: "public/uploads/" });
var idCounter = 0;

app.use(express.static('public'));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/loboncoin");

var announcesSchema = new mongoose.Schema({
  id: String,
  title_name : String,
  photo_url: String,
  nick_name: String,
  price: Number,
  city: String,
  description: String,
  phone_number: Number,
  user_email: String,
  created: { type: Date, default: Date.now }
});

var Announces = mongoose.model("Announces", announcesSchema);

app.get('/deposer', function (req, res) {
  res.render('createAnnounce.ejs')
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

  /* announces.push(newAnnounce);  */
  var adAnnounce = new Announces(newAnnounce);
  
  adAnnounce.save(function(err, obj) {
    console.log(obj);
    if (err) {
      console.log("something went wrong");
    } else {
      console.log("we just saved the new announce " + obj.title_name);


      res.redirect('/annonce/' + adAnnounce._id);
    }
  });
});

/* Voir la liste de toutes les annonces */
app.get("/", function(req, res) {

  Announces.find({}, function(err, adAnnounce) {
    if (!err) {
      console.log(adAnnounce);
    }
    res.render("home.ejs",{
      announces: adAnnounce
    }); 
  });
  
});

app.get('/annonce/:id', function (req, res) {
  var id = req.params.id;
  Announces.findById(id, function(err, adAnnounce) {
    if (!err) {
      console.log(adAnnounce);
    } 
      res.render('viewAnnounce.ejs', {  
          title_name: adAnnounce.title_name,
          photo_url: adAnnounce.photo_url,
          nick_name: adAnnounce.nick_name,
          price: adAnnounce.price,
          city: adAnnounce.city,
          description: adAnnounce.description,
          phone_number: adAnnounce.phone_number,
          user_email: adAnnounce.user_email
        });
      });

});

app.listen(3000, function () {
  console.log('Server started');
});