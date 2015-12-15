module.exports = function(app, model, request){
    app.get("/api/project/payment/initiative/:initiativeId/amount/:amount/rec/:recemail", makepayment);
    app.get("/api/project/initiative/:id", findInitiativeById);
    app.get("/api/project/initiative", findAllInitiatives);
    app.get("/api/project/initiative/search/:searchString", findInitiativesLikeSearchString);
    app.get("/api/project/initiative/userId/:userid", findInitiativeByUserId);
    app.get("/api/project/initiative/funded/:userId", findAllFundedInitiatives);
    app.post("/api/project/initiative/userId/:userid", addInitiative);
    app.put("/api/project/initiative/:id", updateInitiative);
    app.delete("/api/project/initiative/:id", deleteInitiative) ;
    app.put("/api/project/:id/initiativecomment", addComment);


    function findAllFundedInitiatives(req, res){
        var userId = req.params.userId;
        model.getInitiativesFundedByUserId(userId).then(function(blogs){
            res.json(blogs);
        });

    }

    function addComment(req, res){
        var comment = req.body;
        var InitiativeId = req.params.id;
        model.addComment(InitiativeId, comment).then(function(initiative){
            res.json(initiative);
        });

    }


    function addInitiative(req, res) {
        var initiative = req.body;
        model
            .createInitiative(initiative)
            .then(function(initiative){
                res.json(initiative);
            });
    }

    function findInitiativesLikeSearchString(req, res) {
        var searchString = req.params.searchString;
        model
            .findInitiativeBySearch(searchString)
            .then(function(blog){
                res.json(blog);
            });
    }

    function findInitiativeById(req, res) {
        model
            .findInitiativeById(req.params.id)
            .then(function(initiative){
                res.json(initiative);
            });
    }

    function findAllInitiatives(req, res) {
        model
            .findAllInitiatives()
            .then(function(initiatives){
                res.json(initiatives);
            });
    }


    function findInitiativeByUserId(req, res) {
        model
            .findInitiativeByUserId(req.params.userid)
            .then(function(initiative){
                res.json(initiative);
            });
    }

    function updateInitiative(req, res) {
        var initiative = req.body;
        model
            .updateInitiative(req.params.id, initiative)
            .then(function(initiatives){
                res.json(initiatives);
            });
    }

    function deleteInitiative(req, res) {
        model
            .deleteInitiative(req.params.id)
            .then(function(initiatives){
                res.json(initiatives);
            });
    }

    function makepayment(req,res){
        var userId = req.params.userId;
        var initiativeId = req.params.initiativeId;
        var amount = req.params.amount;
        var recemail =  req.params.recemail;
        var paykey;
        var  body = JSON.stringify(
            {
                "actionType":"PAY",    // Specify the payment action
                "currencyCode":"USD",  // The currency of the payment
                "receiverList":{"receiver":[{
                    "amount": amount,                    // The payment amount
                    "email": recemail}]  // The payment Receiver's email address
                },

// Where the Sender is redirected to after approving a successful payment
                "returnUrl":"http://localhost:3000/project/client/index.html#/success/"+amount+"/initiative/"+initiativeId,

// Where the Sender is redirected to upon a canceled payment
                "cancelUrl":"https://www.google.com",
                "requestEnvelope":{
                    "errorLanguage":"en_US",    // Language used to display errors
                    "detailLevel":"ReturnAll"   // Error detail level
                }
            });

        request.post({
            headers: {"X-PAYPAL-SECURITY-USERID": "nargolkar.s-facilitator_api1.husky.neu.edu", "X-PAYPAL-SECURITY-PASSWORD": "APRPCQDDKLMHRBNE", "X-PAYPAL-SECURITY-SIGNATURE": "Aemzju65JKJ8VmViv6wWvD72b5h9ArnSKBO1dFjjth.UQYcTunCPgwKZ", "X-PAYPAL-REQUEST-DATA-FORMAT": "JSON", "X-PAYPAL-RESPONSE-DATA-FORMAT": "JSON", "X-PAYPAL-APPLICATION-ID": "APP-80W284485P519543T", "Content-Type": "application/json"},
            url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Pay',
            body: body
        }, function(error, response, body){
            var payres = JSON.parse(body);
            paykey = payres.payKey;
            res.json(paykey);
            //payredirect(paykey);


        });

    };


};