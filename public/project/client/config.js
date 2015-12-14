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
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
               .when("/profile", {
                    templateUrl: "views/profile/profile.view.html",
                    controller: "ProfileController",
                     controllerAs: "model",
                   resolve: {
                       loggedin: checkLoggedin
                   }
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
                       controller: "BlogsController",
                    controllerAs: "model"
                })
                 .when("/myblogs", {
                    templateUrl: "views/blogs-reguser/blogs-reguser.view.html",
                    controller: "RegBlogController",
                    controllerAs: "model",
                     resolve: {
                         loggedin: checkLoggedin
                     }
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
                    controllerAs: "model",
                      resolve: {
                          loggedin: checkLoggedin
                      }
                })
                .when("/initiative", {
                    templateUrl: "views/initiative/initiative.view.html",
                    controller: "InitiativeController",
                    controllerAs: "model"
                })
                .when("/myfavorites", {
                    templateUrl: "views/favorites/favorites.view.html",
                    controller: "FavoritesController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                 .when("/help", {
                    templateUrl: "views/help/help.view.html",
                 })
                 .otherwise({
                    redirectTo: "/"
                });
        });

  })();

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/rest/loggedin').success(function(user)
    {
        if (user !== '0')
        {
            $rootScope.user = user;
            deferred.resolve();
        }
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};

var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/rest/admin').success(function(user)
    {
        if (user !== '0')
        {
            $rootScope.user = user;
            deferred.resolve();
        }
    });

    return deferred.promise;
}