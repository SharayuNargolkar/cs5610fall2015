"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($rootScope, $scope, $location, UserService) {
       
        $scope.$location = $location;
               
        $scope.login = function(){
            UserService.findUserByUsernameAndPassword($scope.username,$scope.password,function(value){
            if (value != null){
                 $rootScope.user = value;
                 $location.path("/profile")
             }
            console.log(value);
            });
            
         };
    }
})();