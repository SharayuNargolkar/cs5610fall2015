(function(){
    angular
        .module("OneWorldCareApp")
        .controller("AdminController", AdminController);


    function AdminController($rootScope, $routeParams, BlogService, UserService) {
        var model = this;
        model.seeUsersBlogs = seeUsersBlogs
        model.seeUsersInitiatives = seeUsersInitiatives
        model.deleteUser = deleteUser
        function init(){
            UserService.findAllUsers
                .then(function(users){
                     model.users = users;
                });

        } init();
    }
})();
