require('dotenv').config();
var mongoose = require('mongoose');
require("./db/conn");
const app = require('express')();
const http = require('http').Server(app);
const userRoute = require('../Route/userRoute')
app.use("/",userRoute);

const port = process.env.PORT || 8000
http.listen(port, console.log(`server is runnong at PORT NO. ${port}`));