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

// var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

// if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//         process.env.OPENSHIFT_APP_NAME;
// }

//var db = mongoose.connect(connectionString);
 //connect the `mongoose` instance
var db = mongoose.connect('mongodb://localhost/cs5610assignment');
console.log(mongoose);
require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port,ipaddress);