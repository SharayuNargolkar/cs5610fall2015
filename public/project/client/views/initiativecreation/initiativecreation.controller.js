"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativeCreateController", InitiativeCreateController);
    function InitiativeCreateController( $http, $rootScope, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        model.createInitiative = createInitiative;



        function createInitiative(newinitiative) {
            if(newinitiative==null){
                alert('You must enter a Title');}
           else if(newinitiative.title==null){
                alert('You must enter a Title');
            } else if(model.user.paypalemail==null){
                alert('You must register a PayPal email to create an initiative and gather funding');
            }
            else
            {
                newinitiative.founder = {};
                newinitiative.founder.founderId = model.user._id;
                newinitiative.founder.founderName = model.user.username;
                newinitiative.founder.founderPaypal = model.user.paypalemail;
                newinitiative.created = Date.now();
                newinitiative.collectedFunds = 0;
                console.log(newinitiative);
                InitiativeService.createInitiative(model.user._id, newinitiative)
                    .then(function (initiatives) {
                        console.log("Got the following object:" + initiatives);
                        model.newinitiative = null;
                        $location.path('/myinitiatives');
                    });
            }
        };


    }

})();