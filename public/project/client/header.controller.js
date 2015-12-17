(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HeaderController", HeaderController);


    function HeaderController($rootScope, $window, $location, UserService){
        var model = this;
        model.logout = logout;
        model.goToDocs = goToDocs;


        function logout()
        {
            UserService.logout(function()
            {
                $rootScope.user = null;
                $location.url("/home");
            });
        }

        function goToDocs()
        {
            $window.open('https://docs.google.com/a/husky.neu.edu/document/d/1hXtyMGxRm99ZOgZOAAXaiuh_ekVgIxEi34wQmtx40FE/edit?usp=sharing', '_blank');
        }

    }
})();