(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HeaderController", HeaderController);
		
		
 function HeaderController($rootScope, $location, UserService){
     var model = this;
     model.logout = logout;


     function logout()
     {
         UserService.logout(function()
         {
             $rootScope.user = null;
             $location.url("/home");
         });
     }

}
 })();