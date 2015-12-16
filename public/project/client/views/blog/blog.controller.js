(function(){
    angular
        .module("OneWorldCareApp")
        .controller("BlogController", BlogController);


    function BlogController($rootScope, $routeParams, BlogService, UserService){
        var model = this;
        model.user = $rootScope.user;
        var blogId = $routeParams.blogId;
        model.addComment = addComment;
        model.addLike = addLike;

        function init(){
            BlogService.findBlogById(blogId)
                .then(function(blog){
                    console.log("In init of blog",blog);
                    model.blog = blog[0];
                   // $rootScope.blog = model.blog;

                });
        }
        init();

        function addComment(){
            if (!model.user) {
            alert("You need to login to perform this action");
        } else {
            model.newcomment.name = model.user.username;
            BlogService.addComment(blogId, model.newcomment)
                .then(function (blogs) {
                    model.blog = blogs;
                    //console.log(blogs);

                });
        }
        };

        function addLike() {
            if (!model.user) {
                alert("You need to login to perform this action");
            } else {
             var isliked = false;
            for (var i = 0; i <= model.user.blogsliked.length; i++) {
                if (model.user.blogsliked[i] == blogId) {
                    isliked = true
                    break;
                } else {
                    continue;
                }
            }

            if (!isliked) {
                model.blog.likes = model.blog.likes + 1;
                BlogService.updateBlog(blogId, model.blog)
                    .then(function (blogs) {
                        model.event = blogs;
                        console.log(blogs);
                        model.user.blogsliked.push(blogId);
                        UserService.updateUser(model.user)
                            .then(function (user) {
                                init()
                            });

                    });
            };
            }

        }
    }
})();
