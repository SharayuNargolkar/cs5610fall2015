var express = require('express');
var app = express();
var body_parser = require('body-parser');
var passport     = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose = require('mongoose');
var request = require('request');


app.use(express.static(__dirname + '/public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(session({ secret: 'this is the secret'}));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

//app.use(body_parser.json()); // for parsing application/json
//app.use(body_parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(session({ secret: 'this is the secret' }));
//app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(express.static(__dirname + '/public'));

 var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
 var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get("/",function(req,res){
	res.sendfile(__dirname+"/public/hello.html");
})

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}



var db = mongoose.connect(connectionString);
passport.use(new LocalStrategy(
    function(username, password, done)
    {
        RegUserModel.findOne({username: username, password: password}, function(err, user)
        {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
        })
    }));

passport.serializeUser(function(user, done)
{
    done(null, user);
});

passport.deserializeUser(function(user, done)
{
    RegUserModel.findById(user._id, function(err, user)
    {
        done(err, user);
    });
});
 //connect the `mongoose` instance
//var db = mongoose.connect('mongodb://localhost/cs5610');
//console.log(mongoose);
//var db_project = mongoose.connect('mongodb://localhost/cs5610project');
var RegUserModel = require("./public/project/server/models/user.model.js")(app, db, mongoose);
require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, RegUserModel, mongoose, passport, request);

app.listen(port,ipaddress);