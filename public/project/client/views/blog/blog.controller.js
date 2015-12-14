(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogController", BlogController);


    function BlogController($rootScope, $routeParams, BlogService){
        var model = this;
        var blogId = $routeParams.blogId;

        function init(){
            BlogService.findBlogById(blogId)
                .then(function(blog){
                    console.log("In init of blog",blog);
                    model.blog = blog[0];
                    $rootScope.blog = model.blog;

                });
        }
        init();
    }
})();
