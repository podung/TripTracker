(function(){
	var MapDestination = function (destination, map, openSlideshow) {
		var waypoints = [];
		var destination = destination;
		
		var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(destination.lat,destination.lng),
			  title:destination.title
		});
		
		var pathToFull = new google.maps.Polyline({
			path: google.maps.geometry.encoding.decodePath(destination.pathTo)
		});
					
		var pathToDisplay = new google.maps.Polyline({
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 3
		});
		
		google.maps.event.addListener(marker, 'click', openSlideshow);
		
		
		this.start = function() {
			startDrawing();
		}
		
		this.hide = function() {
			// ToDo: Can this cause a race condition with drawNextPoint??
			waypoints.length = 0;
						
			marker.setMap(null);
			pathToDisplay.setMap(null);
		}
		
		this.finish = function() {
			// ToDo: Can this cause a race condition with drawNextPoint??
			
			var remainingPoints = waypoints.slice();
			waypoints.length = 0;
			
			var polyPath = pathToDisplay.getPath();
			
			while (remainingPoints.length > 0)
			{
				polyPath.push(remainingPoints.shift());
			}
		}
		
		this.getMarkerPosition = function() {
			return marker.getPosition();
		};
		
		function startDrawing() {
			var timeToWait = 1;
			// todo: is this case valid?
			if (typeof pathToFull !== 'undefined' && pathToFull.getPath().length > 0)
			{	
				var points = pathToFull.GetPointsAtDistance(200);
				
				map.panTo(points[0]);
				pathToDisplay.setPath([points[0]]);
				pathToDisplay.setMap(map);
				
				waypoints.length = 0;
				waypoints = waypoints.concat(points);
			}
				
			drawNextPoint(pathToDisplay);
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
				marker.setMap(map)
			}
		}
	}
	
	
	window.TripTracker.MapDestination = MapDestination;
})()