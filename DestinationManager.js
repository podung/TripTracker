(function(){
	
	var DestinationManager = function(destinations, map) {
		var currentIndex = 0;
		var waypoints = [];
		
		var destinations = destinations;
		
		this.goTo = function (index) {
			currentIndex = index;
			
			addMarker(destinations[index]);
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
				waypoints.length = 0;
				waypoints = waypoints.concat(points);
				
				drawNextPoint(pathToDisplay);
		}

		var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(destination.lat,destination.lng),
		      
		      title:destination.title
		})
		
		setTimeout(function() {
			marker.setMap(map);
		}, 35 * waypoints.length);
		
		google.maps.event.addListener(marker, 'click', openSlideshow);
		
		destination.pathToDisplayPoly = pathToDisplay;
		destination.marker = marker;
	}
	
		function drawNextPoint(poly)
	{
		if (waypoints.length > 0)
		{
			var nextPoint = waypoints.shift();
		
				setTimeout(function() {
					poly.getPath().push(nextPoint);
		  			map.panTo(nextPoint);
		  			
		  			drawNextPoint(poly);
				}, 35);

		}
	}
	
	}
	
	window.TripTracker.DestinationManager = DestinationManager;
})()