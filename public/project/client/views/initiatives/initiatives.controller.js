"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativesController", InitiativesController);
    function InitiativesController( $http, $rootScope, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        model.makePayment = makePayment;
        var amount = 1;

        function init() {
            // console.log(model.user._id);
            InitiativeService.findAllInitiatives()
                .then(function (initiatives) {
                    console.log("in init", initiatives);
                    model.initiatives = initiatives;
                });
        }

        init();


        function makePayment() {

            InitiativeService.makePayment(amount)
                .then(function (initiatives) {
                    console.log("payment succesful");
                    model.newinitiative = null;
                    init();
                });

        };
    }
})();