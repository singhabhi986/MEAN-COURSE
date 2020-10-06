"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var app = express();

var postsRoutes = require("./routes/post"); //LbhtO2ku1f7mruVm

/* app.use((req, res, next) => {
  console.log('first middleware');
  next();
})
 */

/* app.use((req, res, next) => {
  res.send('hello from express');
  res.end();
}) */


mongoose.connect('mongodb+srv://abhi:Energisfail000@cluster0.xdxix.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(function () {
  console.log('connected');
})["catch"](function () {
  console.log('connection failed');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use("/api/posts", postsRoutes);
module.exports = app;