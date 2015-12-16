"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativeUpdateController", InitiativeUpdateController);
    function InitiativeUpdateController( $http, $rootScope, $routeParams, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        var initId = $routeParams.initiativeId;

      ;

        function init() {
            InitiativeService.findInitiativeById(initId)
                .then(function (initiative) {
                    model.initiative = initiative[0];
                });
        }init();



        function updateInitiative(newinitiative) {

            InitiativeService.updateInitiative(model.initiative._id, newinitiative)
                .then(function (initiatives) {
                    model.initiative = null;
                    $rootScope.initiativeid = null;
                    $location.path('/myinitiatives');
                });

        };
    }

})();