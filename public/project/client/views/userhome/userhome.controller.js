(function(){
    angular
        .module("OneWorldCareApp")
        .controller("UserHomeController", UserHomeController);


    function UserHomeController($rootScope){
        var model = this;
        model.user = $rootScope.user;

    }
})();
