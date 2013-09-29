(function(){
	
	function mockGetDestinationsFromDB() {
		return [
			mockCreateDestination('Dusseldorf', 51.227098,6.774337, "jfjsadl23"),
			mockCreateDestination('Cologne', 50.936796,6.960998, "sdlkfjlskdjfJ@33"),
			mockCreateDestination('Bacharach', 50.056478,7.769684, "lskdfljsdf2231"),
			mockCreateDestination('Braubach', 50.277054,7.644371, "jfjsfdkl2010")
		];
	}
	
	function mockCreateDestination(title, lat, lng, pathTo) {
		return {
			title: title,
			lat: lat,
			lng: lng,
			pathTo: pathTo
		};
	}
	
	var Destinations = function() {
			var self = this;
			
			this.allDestinations = function() {
				return mockGetDestinationsFromDB();
			};
	};
	
	module.exports = new Destinations();
})();