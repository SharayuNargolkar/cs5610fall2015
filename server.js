var express = require('express');
var app = express();
var body_parser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(body_parser.json()); // for parsing application/json
app.use(body_parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get("/",function(req,res){
	res.sendfile(__dirname+"/public/hello.html");
})

 //connect the `mongoose` instance
var db = mongoose.connect('mongodb://localhost/cs5610assignment');
console.log(mongoose);
require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port,ipaddress);