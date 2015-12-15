"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("LoginController", LoginController);
    function LoginController($rootScope, $http, $location, UserService) {
        var model = this;
        model.verify = verify;
       // $rootScope.user = AuthService.getUser();
        model.user = $rootScope.user;



        function verify(user)
        {
            UserService.login(user, function(response)
            { console.log(response);
                if(response != null)
                {
                    $rootScope.user = response;
                    $location.url("/userhome");
                }
                else
                {
                    alert("User does not exist");
                }
            });
        }

        //function login(user)
        //{
        //    UserService.login(user, function(response)
        //    {
        //        if(response != null)
        //        {
        //            $rootScope.currentUser = response;
        //            $location.url("/profile");
        //        }
        //        else
        //        {
        //            vm.message = "User does not exist";
        //        }
        //    });
        //}

    }
})();