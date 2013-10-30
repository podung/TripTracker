(function(){
	
	var DestinationManager = function(destinations, map, openSlideshow) {
		var currentIndex = 0;
		
		var arrayMap = Array.prototype.map;
		
		var destinations = arrayMap.call(destinations, function(x) {
			return new TripTracker.MapDestination(x, map, openSlideshow);
		});
		
		this.goTo = function (index) {
			// ToDo: goTo doesn't work correctly yet...
			currentIndex = index;
			destinations[index].start();
		}
		
		this.next = function () {
			if (currentIndex < TripTracker.Destinations.length - 1) 
			{
				if (currentIndex > 0)
				{
					destinations[currentIndex].finish();
				}
				currentIndex += 1;
				destinations[currentIndex].start();
			}
		}
		
		this.previous = function () {
			if (currentIndex > 0)
			{	
				destinations[currentIndex].hide();
				
				currentIndex -= 1;
				map.panTo(destinations[currentIndex].getMarkerPosition())
			}
		}
	}
	
	window.TripTracker.DestinationManager = DestinationManager;
})()