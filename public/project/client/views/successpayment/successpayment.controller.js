"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("SuccessController", SuccessController);
    function SuccessController( $http, $rootScope, $routeParams, $location, UserService, InitiativeService) {
        var model = this;
        model.user = $rootScope.user
        var initiativeId = $routeParams.initiativeId;
        var amount = $routeParams.amount;
        console.log(initiativeId);


        function init() {
            InitiativeService.findInitiativeById(initiativeId).then(function (initiative) {
                console.log(initiative)
                            model.initiative = initiative[0];
                            if (model.initiative != null) {
                                model.initiative.collectedFunds = model.initiative.collectedFunds + amount;
                                InitiativeService.updateInitiative(model.initiative._id, model.initiative)
                                    .then(function (initiative) {
                                        console.log(initiative);
                                    });
                                model.user.initiativesfunded.push(model.initiative._id)
                                UserService.updateUser(model.user).then(function (user) {
                                    console.log(user);
                                });

                            }
                        })
                    }init();
    }
})();






