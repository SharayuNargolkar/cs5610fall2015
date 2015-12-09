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
                .when("/userhome", {
                    templateUrl: "views/userhome/userhome.view.html",
                    controller: "UserHomeController",
                    controllerAs: "model"
                })
               .when("/profile", {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController",
                     controllerAs: "model"
                })
               .when("/register", {
                    templateUrl: "views/register/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                 .when("/blogs", {
                    templateUrl: "views/blogs/blogs.view.html",
                       controller: "BlogsController",
                    controllerAs: "model"
                })
                 .when("/myblogs", {
                    templateUrl: "views/blogs-reguser/blogs-reguser.view.html",
                    controller: "RegBlogController",
                    controllerAs: "model"
                })
                .when("/blog", {
                    templateUrl: "views/blog/blog.view.html",
                    controller: "BlogController",
                    controllerAs: "model"
                })
                  .when("/initiatives", {
                    templateUrl: "views/initiatives/initiatives.view.html",
                     controller: "InitiativesController",
                    controllerAs: "model"
                })            
                  .when("/myinitiatives", {
                    templateUrl: "views/initiatives-reguser/initiatives-reguser.view.html",
                    controller: "RegInitiativeController",
                    controllerAs: "model"
                })
                .when("/initiative", {
                    templateUrl: "views/initiative/initiative.view.html",
                    controller: "InitiativeController",
                    controllerAs: "model"
                })
                 .when("/help", {
                    templateUrl: "views/help/help.view.html",
                 })
                 .otherwise({
                    redirectTo: "/"
                });
        });
})();