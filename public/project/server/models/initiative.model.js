var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(db, mongoose) {
    var InitiativeSchema = require("./initiative.schema.js")(mongoose);
    var InitiativeModel  = mongoose.model("InitiativeModel", InitiativeSchema);
	    var api = {
        findInitiativeById: findInitiativeById,
        findInitiativeByUserId: findInitiativeByUserId,
        findAllInitiatives: findAllInitiatives,
        createInitiative: createInitiative,
        createComment: createComment,
		deleteInitiative: deleteInitiative,
		updateInitiative: updateInitiative
    };
    return api;
	
    function findInitiativeById(id){
        var deferred = q.defer();

        InitiativeModel.find({_id : id}, function(err, initiative){
            if(err) {
                deferred.reject(err);
            } else {
                console.log(initiative);
               deferred.resolve(initiative);
            }
        });

        return deferred.promise;
    };
    
	function findInitiativeByUserId(userId){
         var deferred = q.defer();

        InitiativeModel.find({founderId : userId}, function(err, initiatives){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(initiatives);
                }
            });

        return deferred.promise;
    };
    
    function findAllInitiatives(){
       var deferred = q.defer();

       InitiativeModel.find(function(err, initiatives){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(initiatives);
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
    
    function createInitiative(initiative){
     var deferred = q.defer();
       InitiativeModel.create(initiative, function(err, initiative) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(initiative);
            }
        });

        return deferred.promise;
    };
	
    
        function createComment(user){
    //  var deferred = q.defer();

    //     InitiativeModel.create(user, function(err, initiative) {
    //         if(err) {
    //             deferred.reject(err);
    //         } else {
    //           //deferred.resolve( findUserById(user._id));
    //             deferred.resolve(initiative);
    //         }
    //     });

    //     return deferred.promise;
    };
    
    function deleteInitiative(id){
        var deferred = q.defer();

        InitiativeModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    };
    
    
    function updateInitiative(id, initiative){
        var deferred = q.defer();

        delete initiative._id;
        InitiativeModel.update({_id: id}, {$set: initiative},
            function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(findInitiativeById(id));
                    }
            });
            
        return deferred.promise;
};

};