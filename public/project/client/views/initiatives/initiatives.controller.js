"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativesController", InitiativesController);
    function InitiativesController( $http, $rootScope, $location, InitiativeService) {
       var model = this;
        model.user = $rootScope.user;
                 
              function init() {
            // console.log(model.user._id);
             InitiativeService.findAllInitiatives()
             .then(function(initiatives){
                 console.log("in init",initiatives);
                 model.initiatives = initiatives;
             });
         }
        init();       
    }                 
     
})();