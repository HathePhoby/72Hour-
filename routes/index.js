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

router.get('/editFlatMate/:id', function(req, res){
var db = req.db;
  		var fcollection = db.get('flatmatecollection');
  		var userToUpdate =req.params.id;
  		fcollection.find({ '_id': userToUpdate},{},function(e,docs){
  			res.render('editFlatMate', {
  				"editFlatMate" : docs
  			});
  		});
});
/* POST to Add Flat MATE Service */
router.post('/editFlatMateTTT', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var name = req.body.flatMateName;
    var gender = req.body.flatMateGender;
    var ocupation = req.body.flatMateOcupation;
    var height = req.body.flatMateHeight;

    var mateToUpdate = req.params.id;
    // Set our collection
    var collection = db.get('flatmatecollection');
    // Submit to the DB
    mateToUpdate.Update({
    	
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

router.get('/editFlat', function(req, res){
var db = req.db;
  		var Fcollection = db.get('usercollection');

  		Fcollection.find({},{},function(e,docs){
  			res.render('editFlat', {
  				"editFlat" : docs
  			});
  		});
});


router.get('/newflatmate', function(req, res){
	res.render('newflatmate', {
		title: 'Add a new flatmate'
	});
});


router.delete('/deleteFlatMate/:id', function(req, res){
	var db = req.db;
	var collection = db.get('flatmatecollection');
	var flatToDelete = req.params.id;
	collection.delete({
		"name" : name,
        "gender" : gender,
        "ocupation" : ocupation,
        "height" : height
	}, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	});
});
function deleteFlatMate(event) {

    event.preventDefault();
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this mate?');
    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            // Update the table
            populateTable();
        });
    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
};




 //To Delete a FLAT
router.delete('/deleteFlat/:id' ,function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	var flatToDelete = req.params.id;
	collection.remove({ '_id' : flatToDelete }, function(err){
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
