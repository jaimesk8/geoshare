
let map, infoWindow;
var latitude = 0; 
var longitude = 0;



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

        //const options = {zoom: 15, scaleControl: true, center: center};
        map = new google.maps.Map(document.getElementById("map"),  {
          center: { lat: 41.1555079, lng: -8.6279243 },
          zoom: 15,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
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

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                const randomString = 0;
                
                const pos = {
                  id: randomString,
                  lat: latitude,
                  lng: longitude
                }

                var cliLon = document.getElementById('cliLon').textContent;
                var cliLat = document.getElementById('cliLat').textContent;
      
                var Flat = parseFloat(cliLat);
                var Flon = parseFloat(cliLon);

                const frick = {lat: Flat, lng: Flon};
                //const frick = {lat: 41.1585692, lng: -8.6300608}; // marco de canaveses 41.1796519,-8.1761074

                // The markers for The Dakota and The Frick Collection
                var mk1 = new google.maps.Marker({position: pos, map: map});
                var mk2 = new google.maps.Marker({position: frick, map: map});
                
                // Calculate and display the distance between markers
                var distance = haversine_distance(mk1, mk2);
                document.getElementById('msg').innerHTML = "Distance between markers: " + distance.toFixed(2) + " mi.";
                // Draw a line showing the straight distance between the markers
                var line = new google.maps.Polyline({path: [pos, frick], map: map});

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
                
                //display on webpage 
                var container = document.getElementById("display");
                var container1 = document.getElementById("display1");
                
                
                var paragraph = document.createElement("p");
                paragraph.id = 'locc';
                var paragraph1 = document.createElement("p");
                paragraph.textContent = latitude;
                paragraph1.textContent = longitude;
                container.appendChild(paragraph);
                container1.appendChild(paragraph1);

                //alert("My pos:" + latitude + " " + longitude);
              },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        });

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

window.initMap = initMap;