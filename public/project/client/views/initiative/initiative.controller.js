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
                    $rootScope.initiative = model.initiative;

                });
        }
        init();

        function addComment(){
            model.newcomment.name = model.user.username;
            InitiativeService.addComment(initiativeId, model.newcomment)
                .then(function(initiatives){
                    model.initiative = initiative;
                    console.log(initiative);

                });
        };

        function makePayment() {
                var amount = model.amount;
                if (amount == 0){
                    $location.path=('/success/'+userId+'/event/'+eventId);
                }else {
                    var recemail = model.initiative.founder.founderPaypal;
                    InitiativeService.makePayment(model.initiative._id, amount, recemail)
                        .then(function (response) {
                            if (response != null) {
                                $window.location.href = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=" + response;
                            } else alert("not working");
                        });

            };
        }




    }
})();

