"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogCreateController", BlogCreateController);
    function BlogCreateController( $http, $rootScope, $location, BlogService) {
        console.log("in blog create");
        var model = this;
        model.user = $rootScope.user;
        model.createBlog = createBlog;

        function createBlog(newblog) {
            newblog.author={};
            newblog.author.authorId = model.user._id;
            newblog.author.authorName = model.user.username;
            newblog.created = Date.now();
            newblog.likes= 0;
            newblog.comments=[];
            console.log(newblog);
            BlogService.createBlog(model.user._id, newblog)
                .then(function (blogs) {
                    console.log("Got the following object:", blogs);
                     $location.path('/myblogs');
                });

        };
    }

})();