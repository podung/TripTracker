(function(){
	var MapDestination = function (destination, map, openSlideshow) {
		var destination = destination;
		var displayPoints;
		var stopDrawing = false;
		
		var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(destination.lat,destination.lng),
			  title:destination.title
		});
				
		// todo: is this case valid?
		if (typeof destination.pathTo !== 'undefined' && destination.pathTo.length > 0)
		{	
			var definedPath = new google.maps.Polyline({
				path: google.maps.geometry.encoding.decodePath(destination.pathTo)
			});
			displayPoints = definedPath.GetPointsAtDistance(200);
		}
		else
		{
			displayPoints = [marker.position];
		}
			
		var pathToDisplay = new google.maps.Polyline({
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 3
		});
		
		google.maps.event.addListener(marker, 'click', openSlideshow);
		
		this.start = function() {
			stopDrawing = false;
			startDrawing();
		}
		
		this.hide = function() {
			// ToDo: Can this cause a race condition with drawNextPoint??

			stopDrawing = true;
			marker.setMap(null);
			pathToDisplay.setMap(null);
		}
		
		this.finish = function() {
			// ToDo: Can this cause a race condition with drawNextPoint??
			
			stopDrawing = true;
			pathToDisplay.setPath(displayPoints);
			marker.setMap(map);
		}
		
		this.getMarkerPosition = function() {
			return marker.getPosition();
		};
		
		function startDrawing() {
			map.panTo(displayPoints[0]);
			pathToDisplay.setPath([displayPoints[0]]);
			pathToDisplay.setMap(map);
			
			drawNextPoint(0);
		}
	
		function drawNextPoint(nextIndex)
		{
			if (stopDrawing)
			{
				stopDrawing = false;
				return;
			}
		
			if (nextIndex < displayPoints.length)
			{
				var nextPoint = displayPoints[nextIndex];
		
					setTimeout(function() {
						pathToDisplay.getPath().push(nextPoint);
						map.panTo(nextPoint);
					
						drawNextPoint(nextIndex + 1);
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