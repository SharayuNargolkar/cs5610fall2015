(function(){
    angular
        .module("OneWorldCareApp")
        .controller("AdminController", AdminController);


    function AdminController($rootScope, $routeParams, BlogService, UserService) {
        var model = this;
        model.removeUser = removeUser;

        function init(){
            UserService.findAllUsers()
                .then(function(users){
                     model.users = users;
                });

        } init();

        function removeUser(userId){
            UserService.deleteUserById(userId)
                .then(function(response){
                    console.log("in delete",response);
                    init();
                });


        };
    }
})();
