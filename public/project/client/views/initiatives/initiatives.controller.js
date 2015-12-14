"use strict";
(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativesController", InitiativesController);
    function InitiativesController( $http, $window,  $rootScope, $location, InitiativeService) {
        var model = this;
        model.user = $rootScope.user;
        model.makePayment = makePayment;
        var amount = 1;
        model.search = search;

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
                .then(function (response) {
                    if (response!=null) {
                        $window.location.href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey="+response;
                    }else alert("not working");
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