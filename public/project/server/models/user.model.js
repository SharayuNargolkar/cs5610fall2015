var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var RegUserModel  = mongoose.model("RegUserModel", UserSchema);
	    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
		deleteUserById: deleteUserById,
		updateUser: updateUser
    };
    return api;
	
    function findUserById(id){
        var deferred = q.defer();

        RegUserModel.find({_id : id}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                console.log(user);
               deferred.resolve(user);
            }
        });

        return deferred.promise;
    };
    
	function findUserByUsername(username){
         var deferred = q.defer();

        RegUserModel.find({username : username}, function(err, users){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;
    };
    
    function findAllUsers(){
       var deferred = q.defer();

       RegUserModel.find(function(err, users){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    };
    
	function findUserByCredentials(credentials){
       var deferred = q.defer();

       RegUserModel.find({username : credentials.username, password : credentials.password},function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
               deferred.resolve(user);
            }
        });

        return deferred.promise;
    };
    	
        function guid() {
  			function s4() {
  				  return Math.floor((1 + Math.random()) * 0x10000)
  				    .toString(16)
				      .substring(1);
			  }
 			 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
 			   s4() + '-' + s4() + s4() + s4();
		} ;
    
    function createUser(user){
     var deferred = q.defer();

        RegUserModel.create(user, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
              //deferred.resolve( findUserById(user._id));
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    };
	
    function deleteUserById(id){
        var deferred = q.defer();

        RegUserModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    };
    
    
    function updateUser(id, user){
        var deferred = q.defer();

        delete user._id;
        RegUserModel.update({_id: id}, {$set: user},
            function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(findUserById(id));
                    }
            });
            
        return deferred.promise;
};

};