"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogCreateController", BlogCreateController);
    function BlogCreateController( $http, $rootScope, $location, BlogService) {
        var model = this;
        model.createBlog = createBlog;

        function createBlog(newblog) {
            newblog.author.authorId = model.user._id;
            newblog.author.authorName = model.user.username;
            newblog.created = Date.now();
            newblog.likes=[]
            newblog.comments=[];
            console.log(newblog);
            BlogService.createBlog(model.user._id, newblog)
                .then(function (blogs) {
                    console.log("Got the following object:" + blogs);
                    model.newblog = null;
                    $location.path('/myblogs');
                });

        };
    }

})();