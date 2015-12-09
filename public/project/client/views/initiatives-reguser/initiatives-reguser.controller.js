"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegInitiativeController", RegInitiativeController);
    function RegInitiativeController( $http, $rootScope, $location, InitiativeService) {
       var model = this;
       model.createInitiative = createInitiative;
       model.update = update;
       model.user = $rootScope.user;
                 
              
         function init() {
             console.log(model.user._id);
             InitiativeService.findInitiativeByUserId(model.user._id)
             .then(function(initiatives){
                 console.log("in init",initiatives);
                 model.initiatives = initiatives;
             });
         }
        init();       
                    
                   
    function createInitiative(newinitiative){
        newinitiative.founderId = model.user._id;
        newinitiative.created = Date.now();
        console.log(newinitiative);
           InitiativeService.createInitiative(model.user._id, newinitiative)
             .then(function(initiatives){
                 console.log("Got the following object:"+initiatives);
                 model.newinitiative = null;
                  init();
                });
          
         };
         
      function update(){
        InitiativeService.update()
            .then(function(initiatives){
                console.log("payment succesful");
                model.newinitiative = null;
                init();
            });

    };
}
})();