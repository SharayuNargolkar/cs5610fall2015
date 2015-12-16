"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogCreateController", BlogCreateController);
    function BlogCreateController( $http, $rootScope, $location, BlogService) {
        console.log("in blog create");
        var model = this;
        model.user = $rootScope.user;
        model.blog = $rootScope.blog;
        model.createBlog = createBlog;
        model.updateBlog = updateBlog;
        if($rootScope.blogflag==true){
            model.blogflag = true
        } else   model.blogflag = false;

        function createBlog(newblog) {
            if(newblog.title==null){
                alert('You must enter a Title');
            } else {
                newblog.author = {};
                newblog.author.authorId = model.user._id;
                newblog.author.authorName = model.user.username;
                newblog.created = Date.now();
                newblog.likes = 0;
                newblog.comments = [];
                console.log(newblog);
                BlogService.createBlog(model.user._id, newblog)
                    .then(function (blogs) {
                        console.log("Got the following object:", blogs);
                        $location.path('/myblogs');
                    });
            }

        };

        function updateBlog(newblog) {

            BlogService.updateBlog(model.blog._id, newblog)
                .then(function (blogs) {
                    model.blog = null;
                    $location.path('/myblogs');
                });

        };
    }

})();