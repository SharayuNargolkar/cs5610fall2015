(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HeaderController", HeaderController);
		
		
 function HeaderController($scope){
   var model = this;
   model.loggedin = false;
    
}
 })();