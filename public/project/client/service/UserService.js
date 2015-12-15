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
			updateUser: updateUser,
			login : login,
			logout: logout,
			findAllLikedBlogs: findAllLikedBlogs,
            findAllFundedInitiatives: findAllFundedInitiatives
		};
		return service;

		function logout(callback)
		{
			$http.post("/api/project/logout")
					.success(callback)
		}

        function findAllFundedInitiatives(userId)
        {
            var deferred = $q.defer();
            $http.get("/api/project/initiative/funded/"+userId)
                .success(function(initiatives){
                     deferred.resolve(initiatives);
                });

            return deferred.promise;
        }

		function findAllLikedBlogs(userId)
		{
			var deferred = $q.defer();
			$http.get("/api/project/blog/liked/"+userId)
					.success(function(blogs){
                        deferred.resolve(blogs);
					});

			return deferred.promise;
		}

		function login(user, callback)
		{  console.log(user);
			$http.post("/rest/login", user)
					.success(callback);
		}

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
			$http.delete("/api/project/user/"+userid)
                .success(function(users){
                    deferred.resolve(users);
                });
	       return deferred.promise;
		}
		
		function updateUser(user){
		 var deferred = $q.defer();
            $http.put("/rest/update" , user)
                .success(function(users){
                    deferred.resolve(users);
                });

            return deferred.promise;
			}	
			
	}
})();