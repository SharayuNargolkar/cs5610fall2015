"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegInitiativeController", RegInitiativeController);
    function RegInitiativeController( $http, $rootScope, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        model.search = search;
        model.goToUpdate = goToUpdate;
        model.deleteInitiative = deleteInitiative;


        function init() {
            console.log(model.user._id);
            InitiativeService.findInitiativeByUserId(model.user._id)
                .then(function(initiatives){
                    model.initiatives = initiatives;
                });
        }
        init();



        function goToUpdate(initiative){
            $rootScope.initiative= initiative;
            $location.path('/createinitiative')


        };

        function deleteInitiative(initiativeId){
            InitiativeService.deleteInitiative(initiativeId)
                .then(function(response){
                    console.log("in delete",response);
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