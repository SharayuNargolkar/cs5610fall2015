"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home/home.view.html",
                })
               .when("/profile", {
                    templateUrl: "profile/profile.view.html",
                    //controller: "ProfileController"
                })
                 .when("/login", {
                    templateUrl: "login/login.view.html",
                   // controller: "LoginController"
                })
                 .when("/register", {
                    templateUrl: "profile/profile.view.html",
                    //controller: "RegisterController"
                })
                 .when("/blogs", {
                    templateUrl: "blogs/blogs.view.html",
                    
                })
                  .when("/initiatives", {
                    templateUrl: "initiatives/initiatives.view.html",
                    
                })
                  .when("/myblogs", {
                    templateUrl: "blogs-reguser/blogs-reguser.view.html",
                    
                })
                  .when("/myinitiatives", {
                    templateUrl: "initiatives-reguser/initiatives-reguser.view.html",
                    
                })
                  .when("/payment", {
                    templateUrl: "payment/payment.view.html",
                 })
                  .when("/help", {
                    templateUrl: "help/help.view.html",
                 })
                  /*.when("/form", {
                    templateUrl: "form/form.view.html",
                    controller: "FormController"
                })
                  .when("/admin", {
                    templateUrl: "admin/admin.view.html",
                })
                  .when("/form-fields", {
                    templateUrl: "form-fields/form-fields.view.html",
                })*/
                .otherwise({
                    redirectTo: "/"
                });
        });
})();