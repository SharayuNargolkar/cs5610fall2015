(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HeaderController", HeaderController);
		
		
 function HeaderController($rootScope){
   var model = this;
      console.log($rootScope.user);
       if ($rootScope.user == null){
            model.loggedin = false
       } else{
           model.loggedin = true
           }
    
}
 })();