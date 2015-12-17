"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativesController", InitiativesController)
        .filter('startFrom', function() {
            return function(input, start) {
                if (input!=null) {
                    start = +start; //parse to int
                    return input.slice(start);
                }
            }
        });
    function InitiativesController($scope, $filter, $http, $window,  $rootScope, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        model.makePayment = makePayment;
        var amount = 1;
        model.search = search;
        model.toggle = toggle;

        model.mainToggleClass = "col-xs-12";
        model.sideBarToggleClass = "col-xs-6 col-xs-offset-3";
        model.toggleShow = false;

        function toggle() {
            if(model.toggleShow) {
                model.toggleShow = false;
            }
            else
            {
                model.toggleShow = true;
            }
//
        }
        model.currentPage = 0;
        model.pageSize = 5;

        function init() {
            // console.log(model.user._id);
            InitiativeService.findAllInitiatives()
                .then(function (initiatives) {
                    console.log("in init", initiatives);
                    model.initiatives = initiatives;

                    model.numberOfPages=function(){
                        return Math.ceil(model.initiatives.length/model.pageSize);
                    }


                });
        }init();


        function makePayment() {

            InitiativeService.makePayment(amount)
                .then(function (response) {
                    if (response!=null) {
                        $window.location.href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey="+response;
                    }else alert("not working");
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