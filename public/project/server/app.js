module.exports = function(app, db, mongoose, request){
	var model = require("./models/user.model.js")(db, mongoose);
	require("./services/user.service.js")(app,model);
	var blogmodel = require("./models/blog.model.js")(db, mongoose);
	require("./services/blog.service.js")(app,blogmodel);
	var initiativemodel = require("./models/initiative.model.js")(db, mongoose);
	require("./services/initiative.service.js")(app, initiativemodel, request);
	
 };