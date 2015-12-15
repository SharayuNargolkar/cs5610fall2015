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
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedinGuest
                    }
                })
                .when("/myblogs", {
                    templateUrl: "views/blogs-reguser/blogs-reguser.view.html",
                    controller: "RegBlogController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/blog/:blogId", {
                    templateUrl: "views/blog/blog.view.html",
                    controller: "BlogController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedinGuest
                    }
                })
                .when("/createblog", {
                    templateUrl: "views/blogcreation/blogcreation.view.html",
                    controller: "BlogCreateController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/initiatives", {
                    templateUrl: "views/initiatives/initiatives.view.html",
                    controller: "InitiativesController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedinGuest
                    }
                })
                .when("/myinitiatives", {
                    templateUrl: "views/initiatives-reguser/initiatives-reguser.view.html",
                    controller: "RegInitiativeController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/initiative/:initiativeId", {
                    templateUrl: "views/initiative/initiative.view.html",
                    controller: "InitiativeController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedinGuest
                    }
                })
                .when("/createinitiative", {
                    templateUrl: "views/initiativecreation/initiativecreation.view.html",
                    controller: "InitiativeCreateController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/success/:amount/initiative/:initiativeId", {
                    templateUrl: "views/successpayment/successpayment.view.html",
                    controller: "SuccessController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/myfavorites", {
                    templateUrl: "views/favorites/favorites.view.html",
                    controller: "FavoritesController",
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        admin    : checkAdmin
                    }
                })
                .when("/adminpostview/:userId", {
                    templateUrl: "views/admin/adminpostview.view.html",
                    controller: "AdminPostViewController",
                    controllerAs: "model",
                    resolve: {
                        admin    : checkAdmin
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

})();

var checkLoggedinGuest = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/rest/loggedin').success(function(user)
    {
        if (user !== '0')
        {
            $rootScope.user = user;
            deferred.resolve();
        }
        else deferred.resolve();

    });

    return deferred.promise;
};

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