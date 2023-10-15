const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); 


var index = require("./routes/index");
var todos = require("./routes/todos");
const { renderFile } = require("ejs");

var app = express();

// view engine
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile); // Example usage with the EJS view engine
app.engine('html', renderFile); // Use the renderFile function directly



app.set('views', path.resolve(__dirname ,'client' , 'views'));

app.use(express.static(path.resolve(__dirname, 'client')));



// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// routes
app.use('/', index);
app.use('/api/v1', todos);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});

