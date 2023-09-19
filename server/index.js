const express = require("express");
const dotEnv = require("dotenv");
dotEnv.config();

const PORT = process.env.PORT;
const app = express();
const routes = require("./routes/index");
const {initDB} = require('./config/mongoose')

//connect to DataBase


//server static files
app.use('/', express.static('./public'));
//middlwware for parse JSON data
app.use(express.json());

app.use(express.urlencoded({extended:true}));


//use the routes
app.use('/', routes);

initDB();

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error occured while running Server....", err);
  }
  console.log("Server is listeninng on POrt", PORT);
});
