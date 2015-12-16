"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($rootScope, $location, $http, UserService) {
       var model = this;
       model.user = $rootScope.user;
       model.update = update;
   
      function update(){
          console.log(model.user);
            UserService.updateUser(model.user)
             .then(function(user){
                $location.path('/profile');
              });
       };
    };
})();