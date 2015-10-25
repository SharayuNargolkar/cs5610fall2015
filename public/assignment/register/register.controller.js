"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($rootScope, $scope, $location, UserService) {
        
        $scope.$location = $location;
                     
        $scope.register = function(user){
            UserService.createUser(user,function(value){
                $rootScope.user = value;
                $location.path("/profile")
                console.log(value);
            });
        };
    }
})();