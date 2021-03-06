(function(){
    angular
        .module("OneWorldCareApp")
        .controller("InitiativeController", InitiativeController);


    function InitiativeController($rootScope, $routeParams, InitiativeService, $window){
        var model = this;
        model.user = $rootScope.user;
        var initiativeId = $routeParams.initiativeId;
        model.addComment = addComment;
        model.makePayment = makePayment;

        function init(){
            InitiativeService.findInitiativeById(initiativeId)
                .then(function(initiative){
                    model.initiative = initiative[0];
                    //$rootScope.initiative = model.initiative;

                });
        }
        init();

        function addComment(){
            if (!model.user) {
                alert("You need to login to perform this action");
            } else {
                model.newcomment.name = model.user.username;
                InitiativeService.addComment(initiativeId, model.newcomment)
                    .then(function (initiative) {
                        model.initiative = initiative;
                        console.log(initiative);

                    });
            }
        };

        function makePayment() {
            if (!model.user) {
                alert("You need to login to perform this action");
            } else if(model.amount == null){
                alert("You need to enter an amount");
            }else if(model.initiative.founder.founderPaypal==null){
                alert("No transfer allowed as founder of this initiative has not registered a paypal email")
            }
            else{
                    var recemail = model.initiative.founder.founderPaypal;
                    InitiativeService.makePayment(model.initiative._id, model.amount, recemail)
                        .then(function (response) {
                            if (response != null) {
                                $window.location.href = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=" + response;
                            } else alert("not working");
                        });

                };
            }





    }
})();

