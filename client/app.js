
$("#askFriend").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#get").click();
    }
  });
  
//display my client info
var z = document.getElementById("code");
var x = document.getElementById("display");
var y = document.getElementById("display1");

const feedDisplay = document.querySelector("#data-output");
const feedDisplay1 = document.querySelector("#data-output1");
  
const randomString = generateRandomString(4);
  
var ask = document.getElementById("askFriend");
var idInput = document.getElementById("get");
  
//get element - fetch data to tables on client side 
const postBtn = document.getElementById('partilha');
postBtn.addEventListener('click', postInfo);
  
const getBtn = document.getElementById('askFriend');
getBtn.addEventListener('click', getInfo);  
  
function postInfo(e){
  
  //prevent to refesh the page
  e.preventDefault();
  var z = document.getElementById("code").textContent;
  var x =  document.getElementById("display").textContent;
  var y =  document.getElementById("display1").textContent;
  
      fetch('http://127.0.0.1:4000/loc', {
          method: "POST",
          body: JSON.stringify({
            //data: pos
            id: z,
            lat: x,
            lon: y
           }),
          headers: { "Content-Type": "application/json" }
      })
        .then(response =>{return response.json()}) 
        .catch(err => console.log(err));
}
  
  
function getInfo(){
  
    
  var id = idInput.value;
  
    fetch('http://127.0.0.1:4000/get/' + id)
    .then(response => {return response.json()})
    .then(data => {
        // Process the data and display in HTML
        var html = '';
    
          html += '<p>' + 'Client Info:' + '</p>';
          html += '<p id="cliId">' + data.id + '</p>';
          html += '<p id="cliLat">' + data.lat + '</p>';
          html += '<p id="cliLon">' + data.lon + '</p>';
        
      feedDisplay.innerHTML = html;
    })
    .catch(err => console.log(err));
}
  
  
  
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  
  return result;
}
  
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError);
  } else { 
    x = "Geolocation is not supported by this browser.";
    alert("Geolocation is not supported by this browser.");
  }
}
  
function showPosition(position) {
  z.innerHTML = randomString;
  x.innerHTML = position.coords.latitude;
  y.innerHTML = position.coords.longitude;
}

const handleError = error => {
  alert(`Unable to retrieve location: ${error.message}`);
};