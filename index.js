
let map, infoWindow;
var latitude = 0; 
var longitude = 0;
let panorama =0;


function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}



function initMap() {

      var id = "";

      var styles = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ];
        //const options = {zoom: 15, scaleControl: true, center: center};
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 41.1555079, lng: -8.6279243 },
          zoom: 15,
          disableDefaultUI: true,
          //mapTypeId: google.maps.MapTypeId.SATELLITE,
          mapId: "e9ec01ddb44aa407",
        });
        
        
        map.setTilt(100);
      
        
        infoWindow = new google.maps.InfoWindow();

      const locationButton = document.getElementById("share");
      //button.setAttribute("id", "buttonGo");

      //locationButton.textContent = "Onde estou?";
     // locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
          // Try HTML5 geolocation.       

          
                var longitude = document.getElementById('display1').textContent;
                var latitude = document.getElementById('display').textContent; 
                var long = parseFloat(longitude);
                var lats = parseFloat(latitude);
                
                const randomString = 0;
                
                const pos = {
                  id: randomString,
                  lat: lats,
                  lng: long
                }

                var cliLon = document.getElementById('cliLon').textContent;
                var cliLat = document.getElementById('cliLat').textContent;
      
                var Flat = parseFloat(cliLat);
                var Flon = parseFloat(cliLon);

                const frick = {lat: Flat, lng: Flon};
                
                // The markers for The Dakota and The Frick Collection
                var mk1 = new google.maps.Marker({position: pos, map: map});
                var mk2 = new google.maps.Marker({position: frick, map: map});

                document.getElementById("toggle").addEventListener("click", toggleStreetView);
                
                // Calculate and display the distance between markers
                var distance = haversine_distance(mk1, mk2);
                document.getElementById('msg').innerHTML = "Distance between markers: " + distance.toFixed(2) + " mi.";
                // Draw a line showing the straight distance between the markers
               // var line = new google.maps.Polyline({path: [pos, frick], map: map});

                let directionsService = new google.maps.DirectionsService();
                let directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(map); // Existing map object displays directions
                // Create route from existing points used for markers
                const route = {
                    origin: pos,
                    destination: frick,
                    travelMode: 'DRIVING'
                }

                directionsService.route(route,
                  function(response, status) { // anonymous function to capture directions
                    if (status !== 'OK') {
                      window.alert('Directions request failed due to ' + status);
                      return;
                    } else {
                      directionsRenderer.setDirections(response); // Add route to the map
                      var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                      if (!directionsData) {
                        window.alert('Directions request failed');
                        return;
                      }
                      else {
                        document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
                      }
                    }
                  });
                
                 
                
                infoWindow.setPosition(pos);
                infoWindow.setContent("Estou aqui.");
                infoWindow.open(map);
                map.setCenter(pos);
                
                panorama = map.getStreetView(); // TODO fix type
                 // panorama.setPosition(pos);
                  
                
                  map.setStreetView(panorama);  
        },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
      );
        

}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


function toggleStreetView() {
  const toggle = panorama.getVisible();

  if (toggle == false) {
    panorama.setVisible(true);
  } else {
    panorama.setVisible(false);
  }
}

window.initMap = initMap;