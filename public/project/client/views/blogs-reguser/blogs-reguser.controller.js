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
        model.toggle = toggle;

        model.mainToggleClass = "col-xs-9";
        model.sideBarToggleClass = "col-xs-3";
        model.toggleShow = true;

        function toggle() {
            if(model.toggleShow) {
                model.mainToggleClass = "col-xs-12";
                model.toggleShow = false;
            }
            else
            {
                model.mainToggleClass = "col-xs-9";
                model.toggleShow = true;
            }
//            model.toggleShow = !model.toggleShow;
        }

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

        function goToUpdate(blogId){
            $location.path('/updateblog/'+blogId);
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