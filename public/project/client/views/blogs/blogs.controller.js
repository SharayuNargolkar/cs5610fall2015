"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogsController", BlogsController);
    function BlogsController( $http, $rootScope, $location, BlogService) {
       var model = this;
        model.user = $rootScope.user;
                 
              function init() {
            // console.log(model.user._id);
             BlogService.findAllBlogs()
             .then(function(blogs){
                 console.log("in init",blogs);
                 model.blogs = blogs;
             });
         }
        init();       
    }                 
     
})();