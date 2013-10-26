var TripTracker = TripTracker || {};

$(function () {
	
	var markers = [];
	var map;
	var destinationLinks = $('#destinations-nav .destination-link');
	var destinationPanel = $('#destination-panel');
	var summaryTitle = destinationPanel.find('.panel-title');
	var summaryDescription = destinationPanel.find('.panel-body');
	
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
	  TripTracker.DestinationManager = new window.TripTracker.DestinationManager(TripTracker.Destinations, map, openSlideshow);
	  TripTracker.DestinationManager.goTo(0);
  }

	function setActiveDestinationLink() {
		destinationLinks.removeClass('active');
		destinationLinks.eq(currentIndex).addClass('active');		
	}
	
	function setSummary(){
		summaryTitle.html(TripTracker.Destinations[currentIndex].title);
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
					setSummary();
					TripTracker.DestinationManager.next();
				}
			});
			
			$("#backButton").click(function(){
				if (currentIndex > 0)
				{	
					currentIndex -= 1;
					setActiveDestinationLink();
					setSummary();
					
					TripTracker.DestinationManager.previous();
				}
			})
			
			$(window).resize(function () {
			    var h = $(window).height(),
			        offsetTop = 104; // Calculate the top offset

			    $('#map-canvas').css('height', (h - offsetTop));
			}).resize();
	});	
});