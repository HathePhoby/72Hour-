var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hello world from index.js' });
  /*var db = req.db;
	res.render(db.usercollection.find().pretty());
	
    var collection = db.getElementsByTagName('')('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });*/



});

/* get list of flats */
  router.get('/userlist', function(req, res){
  	var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
  });

router.get('/newflat', function(req, res) {
    res.render('newflat', { title: 'Add New Flat' });
});

/* POST to Add User Service */
router.post('/addFlat', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var name = req.body.flatFlatName;
    var city = req.body.flatCity;
    var address = req.body.flatAddress;
    var floor = req.body.flatFloor;
    var numberOfRooms = req.body.flatNumberOfRooms;
    var postCode = req.body.flatPostCode;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "Flat name" : name,
        "city" : city,
        "address" : address,
        "floor" : floor,
        "number of rooms" : numberOfRooms,
        "post code" : postCode
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
