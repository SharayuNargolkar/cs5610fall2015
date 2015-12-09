(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HeaderController", HeaderController);
		
		
 function HeaderController($rootScope, UserService){
     var model = this;
     model.login = login;

     console.log($rootScope.user);
       if ($rootScope.user == null){
            model.loggedin = false
       } else{
           model.loggedin = true
           }


     function login(){
         UserService.findUserByEmailAndPassword(model.user.email,model.user.password)
             .then(function(users){
                 if (users[0] == null){
                     alert("User credentials submitted do not exist");
                 } else{
                     model.user = users[0];
                     $rootScope.user = model.user;
                     $location.path("/userhome")
                 }
             });
     };
    
}
 })();