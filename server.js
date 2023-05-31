const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const cors = require('cors');
app.use(cors())

// Middleware to parse request bodies
app.use(express.json());



// Route to receive and store geolocation data
app.post('/loc', (req, res) => {
   //variavel de pesquisa 
   var name =req.body.name;
  // Store the received location data or send it to other clients

  // Send a response back to the client
  console.log(name);
  res.json(name);
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
