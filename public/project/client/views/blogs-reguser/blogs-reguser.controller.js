"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegBlogController", RegBlogController)
        .filter('startFrom', function() {
            return function(input, start) {
                if (input!=null) {
                    start = +start; //parse to int
                    return input.slice(start);
                }
            }
        });
    function RegBlogController( $http, $rootScope, $location, BlogService) {
       var model = this;
       model.user = $rootScope.user;
        model.search = search;
        model.goToUpdate = goToUpdate;
        model.deleteBlog = deleteBlog;
        model.currentPage = 0;
        model.pageSize = 5;

        function init() {
             console.log(model.user._id);
             BlogService.findBlogByUserId(model.user._id)
             .then(function(blogs){
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
                    model.blogs = blogs;
                });
        }

        function goToUpdate(blog){
            $rootScope.blogflag= true;
            $location.path('/createblog');
        };

        function deleteBlog(blogId){
            BlogService.deleteBlog(blogId)
                .then(function(response){
                    console.log("in delete",response);
                    init();
                });


        };
     }
})();