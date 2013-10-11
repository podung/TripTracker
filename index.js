var TripTracker = TripTracker || {};

$(function () {
	
	var markers = [];
	var map;
	var destinationLinks = $('#destinations-nav .destination-link');
	
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
		console.log(TripTracker.Destinations.length)
		addMarker(TripTracker.Destinations[0]);
  }
	
	function addMarker(destination) {
		var timeToWait = 1;
		if (typeof destination.pathTo !== 'undefined' && destination.pathTo.length > 0)
		{
				var decodedPath = google.maps.geometry.encoding.decodePath(destination.pathTo);
			
				var pathToDisplay = new google.maps.Polyline({
				    path: [decodedPath[0]],
				    strokeColor: "#FF0000",
				    strokeOpacity: 1.0,
				    strokeWeight: 3
		  	});
		
				var pathToFull = new google.maps.Polyline({
				    path: decodedPath,
				    strokeColor: "#FF0000",
				    strokeOpacity: 1.0,
				    strokeWeight: 3
		  	});
		
				
				
				
				map.panTo(decodedPath[0]);
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
		      addMarker(TripTracker.Destinations[index]);
		    }, i * 200);
		  })(i);
		}
	}
	
	function setActiveDestinationLink() {
		destinationLinks.removeClass('active');
		destinationLinks.eq(currentIndex).addClass('active');		
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
				if (currentIndex < TripTracker.Destinations.length - 1)
				{
					currentIndex += 1;
					setActiveDestinationLink();
					addMarker(TripTracker.Destinations[currentIndex]);
				}
			});
			
			$("#backButton").click(function(){
				if (currentIndex > 0)
				{
					TripTracker.Destinations[currentIndex].marker.setMap(null);
					TripTracker.Destinations[currentIndex].pathToDisplayPoly.setMap(null);
					
					currentIndex -= 1;
					setActiveDestinationLink();
					map.panTo(TripTracker.Destinations[currentIndex].marker.getPosition())
				}
			})
			
			$(window).resize(function () {
			    var h = $(window).height(),
			        offsetTop = 104; // Calculate the top offset

			    $('#map-canvas').css('height', (h - offsetTop));
			}).resize();
	});
	

	
});