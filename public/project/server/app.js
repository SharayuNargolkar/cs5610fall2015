module.exports = function(app, db, model, mongoose, passport, request){
	//var model = require("./models/user.model.js")(db, mongoose);
	require("./services/user.service.js")(app, model, passport);
	var blogmodel = require("./models/blog.model.js")(db, mongoose, model);
	require("./services/blog.service.js")(app, blogmodel);
	var initiativemodel = require("./models/initiative.model.js")(db, mongoose, model);
	require("./services/initiative.service.js")(app, initiativemodel, request);
	
 };