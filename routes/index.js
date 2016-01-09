var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Hello world from index.js' });

});
/* get list of flats */
router.get('/flatlist', function(req, res){
	var db = req.db;
var collection = db.get('usercollection');
collection.find({},{},function(e,docs){
    res.render('flatlist', {
        "flatlist" : docs
    });
});
});

  /* get list of flat mates */
router.get('/flatmatelist', function(req, res){
		var db = req.db;
		var fcollection = db.get('flatmatecollection');
		fcollection.find({},{},function(e,docs){
			res.render('flatmatelist', {
				"flatmatelist" : docs
			});
		});
});

router.get('/newflatmate', function(req, res){
	res.render('newflatmate', {
		title: 'Add a new flatmate'
	});
});
/* POST to Add Flat MATE Service */
router.post('/addFlatMate', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var name = req.body.flatMateName;
    var gender = req.body.flatMateGender;
    var ocupation = req.body.flatMateOcupation;
    var height = req.body.flatMateHeight;

    // Set our collection
    var collection = db.get('flatmatecollection');
    // Submit to the DB
    collection.insert({
        "name" : name,
        "gender" : gender,
        "ocupation" : ocupation,
        "height" : height
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("flatmatelist");
        }
    });
});
router.get('/deleteFlatMateByName/:id', function(req, res){
var db = req.db;
  		var fcollection = db.get('flatmatecollection');
  		fcollection.find({},{},function(e,docs){
  			res.render('deleteFlatMateByName', {
  				"deleteFlatMateByName" : docs
  			});
  		});
});
router.post('/deleteFlatMateByName', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    
    var name = req.body.flatMateName;
    // Set our collection
    var collection = db.get('usercollection.flatmates');
    // Submit to the DB
    collection.remove({  	
    	"name" : name       
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("flatlist");
        }
    });
});

router.get('/deleteFlatMate/:name', function(req, res){
var db = req.db;
  		var fcollection = db.get('flatmatecollection');
  		fcollection.find({},{},function(e,docs){
  			res.render('deleteFlatMate', {
  				"deleteFlatMate" : docs
  			});
  		});
});
/* POST to delete Flat MATE Service by ID */
router.post('/deleteFlatMateTTT', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var mateToDelete = req.body._id;

    // Set our collection
    var collection = db.get('flatmatecollection');
    // Submit to the DB
    collection.remove({  	
    	"_id" : mateToDelete       
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("flatmatelist");
        }
    });
});


router.get('/newflat', function(req, res) {
    res.render('newflat', { 
    	title: 'Add New Flat' 
    });
});

/* POST to Add Flat Service */
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
        "post code" : postCode, 
         flatmates: [{"name":"testName", 
         "gender":"testGender", 
         "ocupation":"testOcupation", 
         "height":"testHeight"
     }]
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success pasge
            res.redirect("flatlist");
        }
    });
});

router.get('/addFlatMateToFlat/:id', function(req, res){
var db = req.db;
  		var fcollection = db.get('usercollection');
  		fcollection.find({},{},function(e,docs){
  			res.render('addFlatMateToFlat', {
  				"addFlatMateToFlat" : docs
  			});
  		});
});
router.post('/addFlatMateToFlat', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var name = req.body.flatMateName;
    var gender = req.body.flatMateGender;
    var ocupation = req.body.flatMateOcupation;
    var height = req.body.flatMateHeight;

	var flatToUpdate = req.body._id;

    // Set our collection
    var collection = db.get('usercollection');
    
    // Submit to the DB
    collection.insert( {"_id" : flatToUpdate}, {
        "name" : name,
        "gender" : gender,
        "ocupation" : ocupation,
        "height" : height
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success pasge
            res.redirect("flatlist");
        }
    });
});


router.get('/editFlat/:id', function(req, res){
var db = req.db;
  		var fcollection = db.get('usercollection');
  		fcollection.find({},{},function(e,docs){
  			res.render('editFlat', {
  				"editFlat" : docs
  			});
  		});
});

/* POST to Add Flat Service */
router.post('/editFlat', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var id = req.body.flatId;
    var name = req.body.flatFlatName;
    var city = req.body.flatCity;
    var address = req.body.flatAddress;
    var floor = req.body.flatFloor;
    var numberOfRooms = req.body.flatNumberOfRooms;
    var postCode = req.body.flatPostCode;

	var flatToUpdate = req.body._id;
    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.update( {"_id" : id}, {
    	"_id " : id,
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
            // And forward to success pasge
            res.redirect("flatlist");
        }
    });
});

//delete flats
router.get('/deleteFlat/:id', function(req, res){
var db = req.db;
  		var fcollection = db.get('usercollection');
  		fcollection.find({},{},function(e,docs){
  			res.render('deleteFlat', {
  				"deleteFlat" : docs
  			});
  		});
});

/* POST to delete Flat MATE Service by ID */
router.post('/deleteFlat', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var flatToDelete = req.body._id;

    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.remove({  	
    	"_id" : flatToDelete       
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("flatlist");
        }
    });
});


module.exports = router;
