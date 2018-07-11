const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Serve Static Files
app.use(express.static(path.join(__dirname, '/../public/')));
app.get('/favicon.ico', (req, res) => res.status(204));

// GET REQUEST
app.get('/test', function (req, res) {
  console.log("Got a GET request for the homepage");
  
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`))