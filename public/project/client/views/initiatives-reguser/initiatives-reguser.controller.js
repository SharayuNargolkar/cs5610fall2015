"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("RegInitiativeController", RegInitiativeController)
        .filter('startFrom', function() {
            return function(input, start) {
                if (input!=null) {
                    start = +start; //parse to int
                    return input.slice(start);
                }
            }
        });
    function RegInitiativeController( $http, $filter, $rootScope, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        model.search = search;
        model.goToUpdate = goToUpdate;
        model.deleteInitiative = deleteInitiative;
        model.currentPage = 0;
        model.pageSize = 5;


        function init() {
            console.log(model.user._id);
            InitiativeService.findInitiativeByUserId(model.user._id)
                .then(function(initiatives){
                    model.initiatives = initiatives;
                    model.numberOfPages=function(){
                        return Math.ceil(model.initiatives.length/model.pageSize);
                    }
                });
        }
        init();



        function goToUpdate(initiative){
            $rootScope.initiativeflag= true;
            $location.path('/createinitiative')


        };

        function deleteInitiative(initiativeId){
            InitiativeService.deleteInitiative(initiativeId)
                .then(function(response){
                    console.log("in delete",response);
                    init();
                });


        };

        function search(searchString) {
            // console.log(model.user._id);
            InitiativeService.findInitiativesLikeSearchString(searchString)
                .then(function(initiatives){
                    console.log("in search",initiatives);
                    model.initiatives = initiatives;
                });
        }
    }
})();