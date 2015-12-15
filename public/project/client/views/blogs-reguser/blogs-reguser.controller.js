"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegBlogController", RegBlogController);
    function RegBlogController( $http, $rootScope, $location, BlogService) {
       var model = this;
       model.user = $rootScope.user;
        model.search = search;
        model.goToUpdate = goToUpdate;
        model.deleteBlog = deleteBlog;
                 
              
         function init() {
             console.log(model.user._id);
             BlogService.findBlogByUserId(model.user._id)
             .then(function(blogs){
                 model.blogs = blogs;
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
            $rootScope.blog= blog;
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