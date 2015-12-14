"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegisterController", RegisterController);
    function RegisterController( $http, $rootScope, $location, UserService) {
       var model = this;
       model.register = register;
                     
         function register (reguser){
             //console.log (reguser);
            if (reguser.password != model.verifypassword){
                alert("Entered Passwords do not match. Please enter again.")
            } else {
            reguser.blogsliked = [];
            reguser.initiativesfunded = [];
            UserService.createUser(reguser)
                    .then(function(user){
                        console.log(user);
                     model.user = user;
                    $rootScope.user = model.user;
                   $location.path("/profile")
                });
           };
        };
     }
})();