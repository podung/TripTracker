(function () {
	
	var destinations = [
	  ['Dusseldorf', 51.227098,6.774337],
	  ['Cologne', 50.936796,6.960998],
	  ['Bacharach', 50.056478,7.769684],
		['Braubach', 50.277054,7.644371],
	  ['Rothenburg (ob der Tauber)', 49.379411,10.185911],
	  ['Erfurt', 50.98437,11.030563],
	  ['Wittenberg', 51.873735,12.628071],
	  ['Berlin', 52.517892,13.408599],
	  ['Munich', 48.136308,11.578109],
	  ['Füssen', 47.572009,10.691572],
	  ['Munich', 48.136308,11.578109],
	  ['Venice', 45.437671,12.326818],
	  ['Cinque Terre (Monterosso al Mare)', 44.145369,9.653183],
		['Cinque Terre (Vernazza)', 44.134913,9.685003],
		['Cinque Terre (Monterosso al Mare)', 44.145369,9.653183],
	  ['Pisa', 43.722234,10.401939],
	  ['Siena', 43.318184,11.330971],
	  ['Florence', 43.770908,11.248184],
	  ['Rome', 41.892055,12.483162]
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





