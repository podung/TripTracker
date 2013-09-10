(function () {
	
	// ToDo: fix lat/longs and zindex
	var destinations = [
	  ['Dusseldorf', -33.890542, 151.274856, 4],
	  ['Cologne', -33.923036, 151.259052, 5],
	  ['Bacharach', -34.028249, 151.157507, 3],
	  ['Rothenberg (ob der Tauber)', -33.80010128657071, 151.28747820854187, 2],
	  ['Erfurt', -33.950198, 151.259302, 1],
	  ['Wittenberg', -33.950198, 151.259302, 1],
	  ['Berlin', -33.950198, 151.259302, 1],
	  ['Munich', -33.950198, 151.259302, 1],
	  ['Fussen', -33.950198, 151.259302, 1],
	  ['Munich', -33.950198, 151.259302, 1],
	  ['Venice', -33.950198, 151.259302, 1],
	];
	
	
	function initialize() {
	  var mapOptions = {
	    center: new google.maps.LatLng(46.027482,10.389633),
	    zoom: 5,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	
	  var map = new google.maps.Map(document.getElementById("map-canvas"),
	      mapOptions);
	
	}
	
	google.maps.event.addDomListener(window, 'load', initialize);
}());





