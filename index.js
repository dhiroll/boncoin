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
    title_name : title_name,
    photo_url: photo_url,
    nick_name: nick_name,
    price: price,
    city: city,
    description: description,
    phone_number: phone_number,
    user_email: user_email
  };
  
  /* announces.push(newAnnounce);  */
  var adAnnounce = new Announces(newAnnounce);
  
  adAnnounce.save(function(err, obj) {
    console.log(obj);
    if (err) {
      console.log("something went wrong");
    } else {
      console.log("we just saved the new announce ");
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
          _id :adAnnounce._id,
          title_name: adAnnounce.title_name,
          photo_url: adAnnounce.photo_url,
          nick_name: adAnnounce.nick_name,
          price: adAnnounce.price,
          city: adAnnounce.city,
          description: adAnnounce.description,
          phone_number: adAnnounce.phone_number,
          user_email: adAnnounce.user_email,
          publish_date: adAnnounce.created
        });
      });

});

app.get('/deposer/:id', function (req, res) {
  var id = req.params.id;
  res.render('modifyAnnounce.ejs',{
    idAnnounce: id
  })
});

app.post('/deposer/:id', upload.single('photo_url'), function (req, res){
  var modifyId = req.params.id;
   Announces.findById(modifyId, function (err, adAnnounce) {
  if (!err) {
    console.log(adAnnounce);
   } 
    adAnnounce.title_name = req.body.title_name;
    adAnnounce.photo_url = req.file.filename;
    adAnnounce.nick_name = req.body.nick_name;
    adAnnounce.price = req.body.price;
    adAnnounce.city = req.body.city;
    adAnnounce.description = req.body.description;
    adAnnounce.phone_number = req.body.phone_number;
    adAnnounce.user_email = req.body.user_email;
  adAnnounce.save(function (err, adAnnounce) {   
    res.redirect('/');
         });
     });
  });

  app.get('/supprimer/:id', function (req, res) {
    var id = req.params.id;  
    Announces.remove({_id: id},function (err){
      res.redirect('/');
    });
  });

 
app.listen(3000, function () {
  console.log('Server started');
});