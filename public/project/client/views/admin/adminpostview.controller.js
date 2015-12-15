(function(){
    angular
        .module("OneWorldCareApp")
        .controller("AdminPostViewController", AdminPostViewController);


    function AdminPostViewController($rootScope, $routeParams, BlogService, InitiativeService) {
        var model = this;
        var userId = $routeParams.userId;
        model.deleteBlog = deleteBlog;
        model.deleteInitiative = deleteInitiative;

        function init() {
            // console.log(model.user._id);
            BlogService.findBlogByUserId(userId)
                .then(function(blogs){
                    model.blogs = blogs;
                });

            InitiativeService.findInitiativeByUserId(userId)
                .then(function(initiatives){
                    console.log("in init",initiatives);
                    model.initiatives = initiatives;
                });
        }
        init();

        function deleteBlog(blogId){
            BlogService.deleteBlog(blogId)
                .then(function(response){
                    console.log("in delete",response);
                    init();
                });
        };

        function deleteInitiative(initiativeId){
            InitiativeService.deleteInitiative(initiativeId)
                .then(function(response){
                    console.log("in delete",response);
                    init();
                });


        };
    }
})();
