(function(){
	var mongo = require('mongodb').MongoClient;
	var testDestinations;
	
	mongo.connect('mongodb://127.0.0.1:27017/TripTracker', function(err, db) {
	    if(err) throw err
			
			var collection = db.collection('destinations');
			
			// Locate all the entries using find
			collection.find().toArray(function(err, results) {
					testDestinations = results;
					// Let's close the db
					db.close();
       });
	});
	    
//	function mockGetDestinationsFromDB() {
//		return [
//			mockCreateDestination('Dusseldorf', 51.227098,6.774337, ""),
//			mockCreateDestination('Cologne', 50.936796,6.960998, "khtwHsbjh@juw@smc@"),
//			mockCreateDestination('Bacharach', 50.056478,7.769684, "_r{uHgqni@~|jDg}|C"),
//			mockCreateDestination('Braubach', 50.277054,7.644371, "cxopHiemn@}z@cAmm@zDcMP}PjLga@ji@mRv_@g}AzzBed@|x@ka@fn@aaA}gAsS}ZwWiC{P~LwJ`OcCb^_JhRqQfBkVmEuJhDoOb^cNtf@gRja@il@ha@iTvXiTh|AUh`@cCxh@mMf}@sH`l@cNjb@qQxYuWdAwWyJi_@eAkn@hRsUdP}]fo@e]b{@{h@zZcf@|ZaWps@{RflAmBtu@kK~[sUrH{RmEmMoUsJkR{Ekq@k@a]pFs`BhKg}@gGgjB_W_k@{]_No^eAia@vXiVd_@wLjSoF~LqFiC")
//		];
//	}
//	
//	function mockCreateDestination(title, lat, lng, pathTo) {
//		return {
//			title: title,
//			lat: lat,
//			lng: lng,
//			pathTo: pathTo
//		};
//	}
	
	var Destinations = function() {
			var self = this;
			
			this.allDestinations = function() {
				return testDestinations;
			};
	};
	
	module.exports = new Destinations();
})();