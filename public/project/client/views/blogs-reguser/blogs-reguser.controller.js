"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegBlogController", RegBlogController);
    function RegBlogController( $http, $rootScope, $location, BlogService) {
       var model = this;
       model.user = $rootScope.user;
        model.search = search;
                 
              
         function init() {
             console.log(model.user._id);
             BlogService.findBlogByUserId(model.user._id)
             .then(function(blogs){
                 model.blogs = blogs;
             });
         }
        init();       
                    
                   
        function search(title) {
            // console.log(model.user._id);
            BlogService.findBlogsLikeTitle(title)
                .then(function(blogs){
                    model.blogs = blogs;
                });
        }
     }
})();