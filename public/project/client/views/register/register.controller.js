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
                alert("Entered Passwords do not match. Please enter again.");
            } else if(reguser.username == null||reguser.password==null) {
                alert("You must enter a username and password to register");
            }else{
            reguser.blogsliked = [];
            reguser.initiativesfunded = [];
            UserService.createUser(reguser)
                    .then(function(user){
                        if (user==null){
                            alert("UserName entered is not unique")
                        } else {
                            console.log(user);
                            $location.path("/profile")
                        }
                });
           };
        };
     }
})();