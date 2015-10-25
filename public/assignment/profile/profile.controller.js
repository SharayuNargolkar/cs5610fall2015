"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($rootScope, $scope, UserService) {
       
       $scope.user= $rootScope.user;
               
       $scope.update = function(){
            UserService.updateUser($scope.user.id, $scope.user, function(value){
                $rootScope.user = value;  
                console.log(value);                                             
            });
       };
    }
})();