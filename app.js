//const data = { variableName: 'latitude' };
//const data = document.getElementById("share").innerHTML;
// Usage example:

$("#askFriend").keyup(function(event) {
  if (event.keyCode === 13) {
      $("#get").click();
  }
});



const randomString = generateRandomString(8);
//console.log(randomString);

var ask = document.getElementById("askFriend");
var idInput = document.getElementById("get");

//get element - fetch data to tables on client side 
const postBtn = document.getElementById('share');
postBtn.addEventListener('click', postInfo);

const getBtn = document.getElementById('askFriend');
getBtn.addEventListener('click', getInfo);

const feedDisplay = document.querySelector("#data-output");
const feedDisplay1 = document.querySelector("#data-output1");


function postInfo(e){

   //prevent to refesh the page
   e.preventDefault();
   var x =  document.getElementById("display").innerText;;
   var y =  document.getElementById("display1").innerText;

 /*  var pos = {
    id: randomString,
    lat: x,
    lon: y
  }*/

    fetch('http://127.0.0.1:4000/loc', {
        method: "POST",
        body: JSON.stringify({
          //data: pos
          id: randomString,
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