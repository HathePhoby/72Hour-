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


module.exports = router;
