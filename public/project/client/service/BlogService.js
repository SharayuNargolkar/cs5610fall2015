"use strict";
(function(){
	angular
		.module("OneWorldCareApp")
		.factory("BlogService", BlogService);
		
	function BlogService($http, $q){
					
		var service = {
			findAllBlogs: findAllBlogs,
			findBlogById: findBlogById,
			findBlogByUserId: findBlogByUserId,
			createBlog: createBlog,
			deleteBlog: deleteBlog,
			updateBlog: updateBlog
		};
		return service;
		
		function findAllBlogs()
		{
			 var deferred = $q.defer();
			$http.get("/api/project/blog")
		         .success(function(blogs){
                    deferred.resolve(blogs);
                });
                
            return deferred.promise;
		}
		
		function findBlogById(id){
			console.log(id);
		    var deferred = $q.defer();
			$http.get("/api/project/blog/"+id)
		         .success(function(blog){
					deferred.resolve(blog);
                });
            return deferred.promise;
			}	
			   
		function findBlogByUserId(id){
		    var deferred = $q.defer();
			$http.get("/api/project/blog/userId/"+id)
		         .success(function(blog){
					deferred.resolve(blog);
					console.log("This is what is displayed",blog)
                });
            return deferred.promise;
			}	   
			    
		function createBlog(userId, blog){  
			console.log(blog);
		  var deferred = $q.defer();
		   $http.post("/api/project/blog/userId/"+userId, blog)
                .success(function(blog){
                    deferred.resolve(blog);
                });

            return deferred.promise;
		}
		
		function deleteBlog(id)
		{
			 var deferred = $q.defer();
			$http.delete("/api/project/blog"+id)
                .success(function(blogs){
                    deferred.resolve(blogs);
                });
	       return deferred.promise;
		}
		
		function updateBlog(id, blog){
		 var deferred = $q.defer();
            $http.put("/api/project/blog/"+id , blog)
                .success(function(blogs){
                    deferred.resolve(blogs);
                });

            return deferred.promise;
			}	
			
	}
})();