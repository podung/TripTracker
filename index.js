(function () {
	
//	Destination
//		Lat/Long
//		Pics --> full size, thumbnail, description
//		Title
//		PathToNextDestination - empty for last location
//			TravelType
//			LatLong array
	
	
	var destinations = [
	  createDestination('Dusseldorf', 51.227098,6.774337, [new google.maps.LatLng(51.227098,6.774337), new new google.maps.LatLng(50.936796,6.960998)],
	  createDestination('Cologne', 50.936796,6.960998, [new google.maps.LatLng(50.936796,6.960998), new google.maps.LatLng(50.056478,7.769684)],
	  createDestination('Bacharach', 50.056478,7.769684, [new google.maps.LatLng(50.056478,7.769684), new google.maps.LatLng(50.277054,7.644371)
		createDestination('Braubach', 50.277054,7.644371, [new google.maps.LatLng(50.277054,7.644371), new google.maps.LatLng(49.379411,10.185911)],
	  createDestination('Rothenburg (ob der Tauber)', 49.379411,10.185911, [new google.maps.LatLng(49.379411,10.185911), new google.maps.LatLng(50.98437,11.030563)],
	  createDestination('Erfurt', 50.98437,11.030563, [new google.maps.LatLng(50.98437,11.030563), new google.maps.LatLng(51.873735,12.628071),
	  createDestination('Wittenberg', 51.873735,12.628071, [new google.maps.LatLng(51.873735,12.628071), new google.maps.LatLng(52.517892,13.408599)],
	  createDestination('Berlin', 52.517892,13.408599, [new google.maps.LatLng(52.517892,13.408599), new google.maps.LatLng(48.136308,11.578109)],
	  createDestination('Munich', 48.136308,11.578109, [new google.maps.LatLng(48.136308,11.578109), new google.maps.LatLng(47.572009,10.691572)],
	  createDestination('Füssen', 47.572009,10.691572, [new google.maps.LatLng(47.572009,10.691572), new google.maps.LatLng(48.136308,11.578109)],
	  createDestination('Munich', 48.136308,11.578109, [new google.maps.LatLng(48.136308,11.578109), new google.maps.LatLng(45.437671,12.326818)],
	  createDestination('Venice', 45.437671,12.326818, [new google.maps.LatLng(45.437671,12.326818), new google.maps.LatLng(44.145369,9.653183)],
	  createDestination('Cinque Terre (Monterosso al Mare)', 44.145369,9.653183, [new google.maps.LatLng(44.145369,9.653183), new google.maps.LatLng(44.134913,9.685003)],
		createDestination('Cinque Terre (Vernazza)', 44.134913,9.685003, [new google.maps.LatLng(44.134913,9.685003), new google.maps.LatLng(44.145369,9.653183)],
		createDestination('Cinque Terre (Monterosso al Mare)', 44.145369,9.653183, [new google.maps.LatLng(44.145369,9.653183), new google.maps.LatLng(43.722234,10.401939)],
	  createDestination('Pisa', 43.722234,10.401939, [new google.maps.LatLng(43.722234,10.401939), new google.maps.LatLng(43.318184,11.330971)],
	  createDestination('Siena', 43.318184,11.330971, [new google.maps.LatLng(43.318184,11.330971), new google.maps.LatLng(43.770908,11.248184)],
	  createDestination('Florence', 43.770908,11.248184, [new google.maps.LatLng(43.770908,11.248184), new google.maps.LatLng(41.892055,12.483162)],
	  createDestination('Rome', 41.892055,12.483162, []]
	];
	
	var map;
	
	function createDestination(title, lat, lng, pathToNextDestination) {
		return {
			title: title,
			lat: lat,
			lng: lng,
			pathToNextDestination: pathToNextDestination
		}
	}
	
	function initialize() {
	  var mapOptions = {
	    center: new google.maps.LatLng(46.027482,10.389633),
	    zoom: 5,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
		
	  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		dropDestinations();
  }
	
	function addMarker(destination) {
		var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(destination[1],destination[2]),
		      map: map,
		      title:destination[0]
		  })
	}
	
	function dropDestinations() {
		for (var i=0; i < destinations.length; i++) {
	    // setTimeout(function() {
		    addMarker(destinations[i]);
		  // }, i * 200);
		}
	}
	
	google.maps.event.addDomListener(window, 'load', initialize);
}());





