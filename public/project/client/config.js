"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                     controllerAs: "model"
                })
               .when("/profile", {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController",
                     controllerAs: "model"
                    
                })
                 .when("/login", {
                    templateUrl: "views/login/login.view.html",
                   controller: "LoginController",
                   controllerAs: "model"
                   
                })
                 .when("/register", {
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                 .when("/blogs", {
                    templateUrl: "views/blogs/blogs.view.html",
                    
                })
                  .when("/initiatives", {
                    templateUrl: "views/initiatives/initiatives.view.html",
                    
                })
                  .when("/myblogs", {
                    templateUrl: "views/blogs-reguser/blogs-reguser.view.html",
                    
                })
                  .when("/myinitiatives", {
                    templateUrl: "views/initiatives-reguser/initiatives-reguser.view.html",
                    
                })
                  .when("/payment", {
                    templateUrl: "views/payment/payment.view.html",
                 })
                  .when("/help", {
                    templateUrl: "views/help/help.view.html",
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