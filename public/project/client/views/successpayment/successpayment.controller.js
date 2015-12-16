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
        model.init = init



        function init() {
            InitiativeService.findInitiativeById(initiativeId).then(function (initiative) {
                              model.initiative = initiative[0];
                              updateInitiative();
                              updateUser();
                              $location.path('/userhome');

            })};

        function updateInitiative() {
            if (model.initiative.hasOwnProperty('title')==true) {
                model.initiative.collectedFunds = parseFloat(model.initiative.collectedFunds) + parseFloat(amount);
                InitiativeService.updateInitiative(model.initiative._id, model.initiative)
                    .then(function (initiative) {
                        console.log(initiative);
                    });


            }
        }

        function updateUser(){
            if (model.initiative.hasOwnProperty('title')==true){
                model.user.initiativesfunded.push(model.initiative._id);
                console.log(model.user);
                UserService.updateUser(model.user).then(function (user) {
                    console.log(user);
                });
            }

        }


    }
})();






