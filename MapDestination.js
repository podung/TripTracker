(function(){
	var MapDestination = function (destination, map, openSlideshow) {
		var waypoints = [];
		var destination = destination;
		
		this.start = function() {
			addMarker();
		}
		
		this.hide = function() {
			// ToDo: Can this cause a race condition with drawNextPoint??
			waypoints.length = 0;
						
			destination.marker.setMap(null);
			destination.pathToDisplayPoly.setMap(null);
		}
		
		this.finish = function() {
			// ToDo: Can this cause a race condition with drawNextPoint??
			
			var remainingPoints = waypoints.slice();
			waypoints.length = 0;
			
			var polyPath = destination.pathToDisplayPoly.getPath();
			
			while (remainingPoints.length > 0)
			{
				polyPath.push(remainingPoints.shift());
			}
		}
		
		function addMarker() {
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
						path: decodedPath
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
			else
			{
				destination.marker.setMap(map)
			}
		}
	}
	window.TripTracker.MapDestination = MapDestination;
})()