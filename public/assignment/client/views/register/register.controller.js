"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($rootScope, $scope, $location, UserService) {
        
        $scope.$location = $location;
                     
        $scope.register = function(user){
            if ($scope.reguser.password != $scope.reguser.verifypassword){
                alert("Entered Passwords do not match. Please enter again.")
            } else {
            UserService.createUser(user,function(value){
                $rootScope.user = value;
                $location.path("/profile")
                console.log(value);
            });
        };
      }
    }
})();