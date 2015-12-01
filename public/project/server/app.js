module.exports = function(app, db, mongoose){
	var model = require("./models/user.model.js")(db, mongoose);
	require("./services/user.service.js")(app,model);
 };