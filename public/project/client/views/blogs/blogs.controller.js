"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogsController", BlogsController)
        .filter('startFrom', function() {
            return function(input, start) {
                if (input!=null) {
                    start = +start; //parse to int
                    return input.slice(start);
                }
            }
        });
    function BlogsController( $http, $rootScope, $location, BlogService) {
       var model = this;
        model.user = $rootScope.user;
        model.search = search;


        model.currentPage = 0;
        model.pageSize = 5;

        function init() {
            // console.log(model.user._id);
             BlogService.findAllBlogs()
             .then(function(blogs){
                 console.log("in init",blogs);
                 model.blogs = blogs;
                 model.numberOfPages=function(){
                     return Math.ceil(model.blogs.length/model.pageSize);
                 }
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