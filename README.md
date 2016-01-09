# 72Hour-
in index.js we have router."HTTP ACTION". e.g router.get("/",function...) or router.pot("addFlat",...")
Calling res.render("X",..) means it renders X.jade
get flats from localhost:3000/flatlist
add flats with localhot:3000/newflat
check all flatmates with localhost:300/flatmatelist
add new flat mate with localhost:300/newflatmate
delete flat localhost:3000/deleteFlat/id    example localhost:3000/deleteFlat/56903bfd3871958a07c80c75
edit flat localhost:3000/editFlat/id         example localhost:3000/editFlat/56903bfd3871958a07c80c75
add New Flatmate to specific flat localhost:3000/addFlatMateToFlat/id  example localhost:3000/addFlatMateToFlat/56903bfd3871958a07c80c75
delete flatmate from spesific flat        

Manual Handeling Launtching CMD: 
	- in project   "npm start"    - Start server
	- in MondoDB   "mongod --dbpath d:\Internship\72HourChallange\data\"    - Start database
	- in MondoDB/bin     "mongo" -> "use 72HourChallange" -->  "db.usercollection.find()" --> "db.flatmatecollection.find()"     --------> Use 72HourChallange Db,  Show all flats,  show all flatmates
	    To add a new data:  
				--> db.usercollection.insert({"":""}, flatmates[{"":""}])
		To delete data:
				--> db.usercollection.remove({"":""})
		Restart server:
				--> Ctrl + C ---> "npm start"

Function's :  /// In order to Delete or Update a Flat the ID of it is requered to know and be written
			  /// With this ID the program knows what to delete or update
	- ADD Flat with a test Flatmate
	   var collection = db.get('usercollection');      --> getting the flats 
			collection.insert({                        --> Insering into db
				"Flat name" : name,
				"city" : city,
				"address" : address,
				"floor" : floor,
				"number of rooms" : numberOfRooms,
				"post code" : postCode,          
				 flatmates: [{"name":"testName",        --> TEST Flatmate           
				 "gender":"testGender", 
				 "ocupation":"testOcupation", 
				 "height":"testHeight"
			 }]
	- Edit flat:
		var id = req.body.flatId;                      
		var collection = db.get('usercollection');       -->getting flats
			collection.update( {"_id" : id}, {           --> update a spesific flat
				"_id " : id,								---> With this entered ID of the flat
				"Flat name" : name,
				"city" : city,
				"address" : address,
				"floor" : floor,
				"number of rooms" : numberOfRooms,
				"post code" : postCode
			}
	- Delete Flat:
		    var flatToDelete = req.body._id;                
			var collection = db.get('usercollection');
			collection.remove({  	                        --> Remove the flat with ID
				"_id" : flatToDelete  
			}, 
.JADE view's: 
    - In order to see all the flats:
	   each user, i in flatlist                      --> each flat will have Name, City, Address etc.
                br
                br
                h1 Flat Name:     
                p=user["Flat name"]                  --> get Flat name {"Flat name": "something"}
                h4 City:
                p=user.city                          
                h4 address:
                p=user.address 
                h4 Floor:
                p=user.floor 
                h4 number of rooms:
                p=user["number of rooms"] 
                h4 post code:
                p=user["post code"]
	- Creation of flats form :   ///This for makes the input and creates the JSON object in DB.
	
	    form#formAddUser(name="addFlat",method="post",action="/addFlat")
        input#inputUserName(type="text", placeholder="flat name", name="flatFlatName")
        br
        input#inputUserEmail(type="text", placeholder="flat city", name="flatCity")
        br
        input#inputUserAddr(type="text", placeholder="address", name="flatAddress")
        br
        input#inputUserFloor(type="text", placeholder="floor", name="flatFloor")
        br
        input#inputUserRooms(type="text", placeholder="number of rooms", name="flatNumberOfRooms")
        br
        input#inputUserPostCode(type="text", placeholder="post code", name="flatPostCode")
        br
        button#btnSubmit(type="submit") submit

		
