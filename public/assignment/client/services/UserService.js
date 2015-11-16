"use strict";
(function(){
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);
		
	function UserService($http, $q)
	{
		var users = [
			//{username:"Alice" , password:"alice123"}
		];
			
		var service = {
			findAllUsers: findAllUsers,
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return service;
		
		function findAllUsers(callback)
		{
			callback(users);
		}
		
		function findUserByUsernameAndPassword(uname, pword){
		    var deferred = $q.defer();
			console.log(uname);
			console.log(pword);
			$http.get("/api/assignment/user/username="+uname+"&password="+pword)
		         .success(function(user){
                    deferred.resolve(user);
                });
            return deferred.promise;
			}	
		
	    
		function createUser(user){  
		  var deferred = $q.defer();
            $http.post("/api/assignment/user",user)
                .success(function(user){
                    deferred.resolve(user);
                });

            return deferred.promise;
		}
		
		function deleteUserById(userid, callback)
		{
			users.splice(userid, 1);
			callback(users);
		}
		
		function updateUser(id, user){
		 var deferred = $q.defer();
            $http.put("/api/assignment/user/"+id , user)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
			}	
			
	}
})();