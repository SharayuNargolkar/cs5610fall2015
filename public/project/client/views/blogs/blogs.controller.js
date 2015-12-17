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
        model.toggle = toggle;

        model.mainToggleClass = "col-xs-12";
        model.sideBarToggleClass = "col-xs-6 col-xs-offset-3";
        model.toggleShow = false;

        function toggle() {
            if (model.toggleShow) {
                //model.mainToggleClass = "col-xs-12";
                model.toggleShow = false;
            }
            else {
                // model.mainToggleClass = "col-xs-6";
                model.toggleShow = true;
            }
//            model.toggleShow = !model.toggleShow;
        }


        model.currentPage = 0;
        model.pageSize = 5;

        function init() {
            // console.log(model.user._id);
            BlogService.findAllBlogs()
                .then(function (blogs) {
                    console.log("in init", blogs);
                    model.blogs = blogs;
                    model.numberOfPages = function () {
                        return Math.ceil(model.blogs.length / model.pageSize);
                    }
                });
        }

        init();


        function search(searchString) {
            if (searchString == null||searchString=="") {
                init();
            } else {
                // console.log(model.user._id);
                BlogService.findBlogsLikeSearchString(searchString)
                    .then(function (blogs) {
                        console.log("in search", blogs);
                        model.blogs = blogs;

                    });
            }
        }
    }
     
})();