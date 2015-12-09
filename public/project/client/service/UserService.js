"use strict";
(function(){
	angular
		.module("OneWorldCareApp")
		.factory("UserService", UserService);
		
	function UserService($http, $q){
					
		var service = {
			findAllUsers: findAllUsers,
			findUserByEmailAndPassword: findUserByEmailAndPassword,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return service;
		
		function findAllUsers()
		{
			 var deferred = $q.defer();
			$http.get("/api/project/user")
		         .success(function(users){
                    deferred.resolve(users);
                });
                
            return deferred.promises;
		}
		
		function findUserByEmailAndPassword(email, pword){
		    var deferred = $q.defer();
			$http.get("/api/project/user/email="+email+"&password="+pword)
		         .success(function(user){
					deferred.resolve(user);
                });
            return deferred.promise;
			}	
			    
		function createUser(user){  
		  var deferred = $q.defer();
            $http.post("/api/project/user",user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
		}
		
		function deleteUserById(userid)
		{
			 var deferred = $q.defer();
			$http.delete("/api/project/user"+userid)
                .success(function(users){
                    deferred.resolve(users);
                });
	       return deferred.promise;
		}
		
		function updateUser(id, user){
		 var deferred = $q.defer();
            $http.put("/api/project/user/"+id , user)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
			}	
			
	}
})();