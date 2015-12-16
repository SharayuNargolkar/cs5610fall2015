"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogUpdateController", BlogUpdateController);
    function BlogUpdateController( $http, $rootScope,$routeParams, $location, BlogService) {
        console.log($rootScope.blogid);
        var model = this;
        model.user = $rootScope.user;
        var blogid = $routeParams.blogId;
        model.updateBlog = updateBlog;

        function init() {
            BlogService.findBlogById(blogid)
                .then(function (blog) {
                    console.log(blog);
                    model.blog = blog[0];
                });
        }init();


        function updateBlog(newblog) {

            BlogService.updateBlog(model.blog._id, newblog)
                .then(function (blogs) {
                    model.blog = null;
                    $location.path('/myblogs');
                });

        };
    }

})();