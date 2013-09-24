(function () {
	
//	Destination
//		Lat/Long
//		Pics --> full size, thumbnail, description
//		Title
//		PathToNextDestination - empty for last location
//			TravelType
//			LatLong array
	
	//var toCologneEncoded = "i`twH{kjh@roAwX`uAwXz|@mE~lAip@`j@eP`j@_NxwAal@fcDk_AzqGmdEd|Eq|H|vE}pCbrFw_Ct|EqnB";
	
	var destinations = [
		createDestination('Dusseldorf', 51.227098,6.774337, []),
		createDestination('Cologne', 50.936796,6.960998, [new google.maps.LatLng(51.227098,6.774337), new google.maps.LatLng(50.936796,6.960998)]),
		createDestination('Bacharach', 50.056478,7.769684, [new google.maps.LatLng(50.936796,6.960998), new google.maps.LatLng(50.056478,7.769684)]),
		createDestination('Braubach', 50.277054,7.644371, [new google.maps.LatLng(50.057139,7.773170),
				new google.maps.LatLng(50.066726,7.773514),
				new google.maps.LatLng(50.074163,7.772570),
				new google.maps.LatLng(50.076422,7.772484),
				new google.maps.LatLng(50.079286,7.770338),
				new google.maps.LatLng(50.084766,7.763557),
				new google.maps.LatLng(50.087878,7.758322),
				new google.maps.LatLng(50.102964,7.738495),
				new google.maps.LatLng(50.108910,7.729225),
				new google.maps.LatLng(50.114414,7.721672),
				new google.maps.LatLng(50.124980,7.733345),
				new google.maps.LatLng(50.128282,7.737808),
				new google.maps.LatLng(50.132244,7.738495),
				new google.maps.LatLng(50.135104,7.736263),
				new google.maps.LatLng(50.136975,7.733688),
				new google.maps.LatLng(50.137635,7.728710),
				new google.maps.LatLng(50.139395,7.725620),
				new google.maps.LatLng(50.142366,7.725105),
				new google.maps.LatLng(50.146106,7.726135),
				new google.maps.LatLng(50.147976,7.725277),
				new google.maps.LatLng(50.150616,7.720299),
				new google.maps.LatLng(50.153036,7.713947),
				new google.maps.LatLng(50.156116,7.708454),
				new google.maps.LatLng(50.163374,7.702961),
				new google.maps.LatLng(50.166783,7.698841),
				new google.maps.LatLng(50.170192,7.683907),
				new google.maps.LatLng(50.170302,7.678585),
				new google.maps.LatLng(50.170961,7.671890),
				new google.maps.LatLng(50.173270,7.661934),
				new google.maps.LatLng(50.174809,7.654724),
				new google.maps.LatLng(50.177228,7.649059),
				new google.maps.LatLng(50.180196,7.644768),
				new google.maps.LatLng(50.184153,7.644424),
				new google.maps.LatLng(50.188110,7.646313),
				new google.maps.LatLng(50.193276,7.646656),
				new google.maps.LatLng(50.200858,7.643566),
				new google.maps.LatLng(50.204484,7.640820),
				new google.maps.LatLng(50.209428,7.633095),
				new google.maps.LatLng(50.214261,7.623482),
				new google.maps.LatLng(50.220962,7.619019),
				new google.maps.LatLng(50.227222,7.614555),
				new google.maps.LatLng(50.231065,7.606144),
				new google.maps.LatLng(50.234250,7.593784),
				new google.maps.LatLng(50.234799,7.585030),
				new google.maps.LatLng(50.236775,7.580395),
				new google.maps.LatLng(50.240398,7.578850),
				new google.maps.LatLng(50.243582,7.579880),
				new google.maps.LatLng(50.245888,7.583485),
				new google.maps.LatLng(50.247754,7.586575),
				new google.maps.LatLng(50.248851,7.594643),
				new google.maps.LatLng(50.249071,7.599449),
				new google.maps.LatLng(50.247864,7.615070),
				new google.maps.LatLng(50.245888,7.625027),
				new google.maps.LatLng(50.247205,7.642193),
				new google.maps.LatLng(50.251047,7.649231),
				new google.maps.LatLng(50.255986,7.651634),
				new google.maps.LatLng(50.261034,7.651978),
				new google.maps.LatLng(50.266521,7.647858),
				new google.maps.LatLng(50.270252,7.642708),
				new google.maps.LatLng(50.272446,7.639446),
				new google.maps.LatLng(50.273653,7.637215),
				new google.maps.LatLng(50.274860,7.637901)])
	];
	
	var markers = [];
	var map;
	
	function createDestination(title, lat, lng, pathTo) {
		return {
			title: title,
			lat: lat,
			lng: lng,
			pathTo: pathTo,
			marker: null,
			pathToDisplayPoly: null
		};
	}
	
	function initialize() {
	  var mapOptions = {
	    center: new google.maps.LatLng(50.939393,6.963744), // (46.027482,10.389633), // This is a good center for the map...
	    zoom: 8,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
		
	  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	  //destinations.push(createDestination('Dusseldorf', 51.227098,6.774337, google.maps.geometry.encoding.decodePath(toCologneEncoded)));
		//dropDestinations();
		addMarker(destinations[0]);
  }
	
	function addMarker(destination) {
		var timeToWait = 1;
		if (typeof destination.pathTo !== 'undefined' && destination.pathTo.length > 0)
		{
			
				var pathToDisplay = new google.maps.Polyline({
				    path: [destination.pathTo[0]],
				    strokeColor: "#FF0000",
				    strokeOpacity: 1.0,
				    strokeWeight: 3
		  	});
		
				var pathToFull = new google.maps.Polyline({
				    path: destination.pathTo,
				    strokeColor: "#FF0000",
				    strokeOpacity: 1.0,
				    strokeWeight: 3
		  	});
		
				
				
				
				map.panTo(destination.pathTo[0]);
				pathToDisplay.setMap(map);
				
				var points = pathToFull.GetPointsAtDistance(200);
				
				for (i = 0; i < points.length; i++)
				{
					  (function(index){
					  	setTimeout(function() {
					      drawNextPoint(pathToDisplay, points[index]);
					    }, i * 35);
					  })(i);
						timeToWait += 35;
				}
		}

		var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(destination.lat,destination.lng),
		      
		      title:destination.title
		  })
		
		setTimeout(function() {
			marker.setMap(map);
		}, timeToWait);
		
		google.maps.event.addListener(marker, 'click', openSlideshow);
		
		destination.pathToDisplayPoly = pathToDisplay;
		destination.marker = marker;
	}
	
	function drawNextPoint(poly, point)
	{
		 
			poly.getPath().push(point);
		  map.panTo(point);
	}
	
	function dropDestinations() {

		for (var i=0; i < destinations.length; i++) {
			
		  (function(index){
		  	setTimeout(function() {
		      addMarker(destinations[index]);
		    }, i * 200);
		  })(i);
		}
	}
	
	function openSlideshow() {
		$.magnificPopup.open({
		    items: [
		      {
		        src: 'pics/1.jpg',
				title: 'This is just a test.  But I do want to see what would happen if we display a really long caption and place this on the site.  Like if we are explaining a picture, you know? This is just a test.  But I do want to see what would happen if we display a really long caption and place this on the site.  Like if we are explaining a picture, you know? This is just a test.  But I do want to see what would happen if we display a really long caption and place this on the site.  Like if we are explaining a picture, you know? This is just a test.'
		      },
		      {
		        src: 'pics/2.jpg',
		      },
			  {
		        src: 'pics/3.jpg',
		      },
		    ],
		    gallery: {
		      enabled: true
		    },
		    type: 'image', // this is default type
			closeOnBgClick: false
		});
	}
	
	google.maps.event.addDomListener(window, 'load', initialize);
	
	var currentIndex = 0;
	
	$(function() {
		
			$("#nextButton").click(function(){
				if (currentIndex < destinations.length - 1)
				{
					currentIndex += 1;
					addMarker(destinations[currentIndex]);
				}
			});
			
			$("#backButton").click(function(){
				if (currentIndex > 0)
				{
					destinations[currentIndex].marker.setMap(null);
					destinations[currentIndex].pathToDisplayPoly.setMap(null);
					
					currentIndex -= 1;
					map.panTo(destinations[currentIndex].marker.getPosition())
				}
			})
			
			$(window).resize(function () {
			    var h = $(window).height(),
			        offsetTop = 104; // Calculate the top offset

			    $('#map-canvas').css('height', (h - offsetTop));
			}).resize();
	});
	

	
}());





