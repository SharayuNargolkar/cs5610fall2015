"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativeCreateController", InitiativeCreateController);
    function InitiativeCreateController( $http, $rootScope, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        model.initiative=$rootScope.initiative;
        model.createInitiative = createInitiative;
        model.updateInitiative = updateInitiative;


        function createInitiative(newinitiative) {
            newinitiative.founder={};
            newinitiative.founder.founderId = model.user._id;
            newinitiative.founder.founderName = model.user.username;
            newinitiative.founder.founderPaypal  = model.user.paypalemail;
            newinitiative.created = Date.now();
            newinitiative.collectedFunds = 0;
            console.log(newinitiative);
            InitiativeService.createInitiative(model.user._id, newinitiative)
                .then(function (initiatives) {
                    console.log("Got the following object:" + initiatives);
                    model.newinitiative = null;
                   $location.path('/myinitiatives');
                });

        };

        function updateInitiative(newinitiative) {

            InitiativeService.updateInitiative(model.initiative._id, newinitiative)
                .then(function (initiatives) {
                    model.initiative = null;
                    $location.path('/myinitiatives');
                });

        };
    }

})();