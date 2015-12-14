"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegInitiativeController", RegInitiativeController);
    function RegInitiativeController( $http, $rootScope, $location, InitiativeService) {
       var model = this;
       model.update = update;
       model.user = $rootScope.user;
        model.search = search;
                 
              
         function init() {
             console.log(model.user._id);
             InitiativeService.findInitiativeByUserId(model.user._id)
             .then(function(initiatives){
                 console.log("in init",initiatives);
                 model.initiatives = initiatives;
             });
         }
        init();       


         
      function update(){
        InitiativeService.update()
            .then(function(initiatives){
                console.log("payment succesful");
                model.newinitiative = null;
                init();
            });

    };

        function search(title) {
            // console.log(model.user._id);
            InitiativeService.findInitiativesLikeTitle(title)
                .then(function(initiatives){
                    console.log("in search",initiatives);
                    model.initiatives = initiatives;
                });
        }
}
})();