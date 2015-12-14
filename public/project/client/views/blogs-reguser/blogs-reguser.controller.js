"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegBlogController", RegBlogController);
    function RegBlogController( $http, $rootScope, $location, BlogService) {
       var model = this;
       model.createBlog = createBlog;
       model.user = $rootScope.user;
        model.search = search;
                 
              
         function init() {
             console.log(model.user._id);
             BlogService.findBlogByUserId(model.user._id)
             .then(function(blogs){
                 console.log("in init",blogs);
                 model.blogs = blogs;
             });
         }
        init();       
                    
                   
    function createBlog(newblog){
        newblog.authorId = model.user._id;
        newblog.created = Date.now();
        console.log(newblog);
           BlogService.createBlog(model.user._id, newblog)
             .then(function(blogs){
                 console.log("Got the following object:"+blogs);
                 model.newblog = null;
                  init();
                });
          
         };

        function search(title) {
            // console.log(model.user._id);
            BlogService.findBlogsLikeTitle(title)
                .then(function(blogs){
                    console.log("in search",blogs);
                    model.blogs = blogs;
                });
        }
     }
})();