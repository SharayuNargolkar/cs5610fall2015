"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogsController", BlogsController);
    function BlogsController( $http, $rootScope, $location, BlogService) {
       var model = this;
        model.user = $rootScope.user;
        model.search = search;
                 
        function init() {
            // console.log(model.user._id);
             BlogService.findAllBlogs()
             .then(function(blogs){
                 console.log("in init",blogs);
                 model.blogs = blogs;
             });
         }
        init();


        function search(searchString) {
            // console.log(model.user._id);
            BlogService.findBlogsLikeSearchString(searchString)
                .then(function(blogs){
                    console.log("in search",blogs);
                    model.blogs = blogs;
                });
        }
    }                 
     
})();