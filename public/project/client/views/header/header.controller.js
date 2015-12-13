(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HeaderController", HeaderController);
		
		
 function HeaderController($rootScope, UserService){
     var model = this;


     console.log($rootScope.user);

}
 })();