
// Get the user's geolocation
navigator.geolocation.getCurrentPosition((position) => {
    const lat = document.querySelectorAll("");
    latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Create an object with the geolocation data
    const locData= {
      latitude: latitude,
      longitude: longitude,
    };
  
    // Send the geolocation data to the server
    fetch('/loc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });