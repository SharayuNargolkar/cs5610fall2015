"use strict";
(function(){
	angular
		.module("OneWorldCareApp")
		.factory("InitiativeService", InitiativeService);
		
	function InitiativeService($http, $q){
					
		var service = {
			findAllInitiatives: findAllInitiatives,
			findInitiativeById: findInitiativeById,
			findInitiativeByUserId: findInitiativeByUserId,
			createInitiative: createInitiative,
			deleteInitiative: deleteInitiative,
			updateInitiative: updateInitiative,
			makePayment: makePayment
		};
		return service;
		
		function findAllInitiatives()
		{
			 var deferred = $q.defer();
			$http.get("/api/project/initiative")
		         .success(function(initiatives){
                    deferred.resolve(initiatives);
                });
                
            return deferred.promise;
		}
		
		function findInitiativeById(id){
			console.log(id);
		    var deferred = $q.defer();
			$http.get("/api/project/initiative/"+id)
		         .success(function(initiative){
					deferred.resolve(initiative);
                });
            return deferred.promise;
			}	
			   
		function findInitiativeByUserId(id){
		    var deferred = $q.defer();
			$http.get("/api/project/initiative/userId/"+id)
		         .success(function(initiative){
					deferred.resolve(initiative);
					console.log("This is what is displayed",initiative)
                });
            return deferred.promise;
			}	   
			    
		function createInitiative(userId, initiative){  
			console.log(initiative);
		  var deferred = $q.defer();
		   $http.post("/api/project/initiative/userId/"+userId, initiative)
                .success(function(initiative){
                    deferred.resolve(initiative);
                });

            return deferred.promise;
		}
		
		function deleteInitiative(id)
		{
			 var deferred = $q.defer();
			$http.delete("/api/project/initiative"+id)
                .success(function(initiatives){
                    deferred.resolve(initiatives);
                });
	       return deferred.promise;
		}
		
		function updateInitiative(id, initiative){
		 var deferred = $q.defer();
            $http.put("/api/project/initiative/"+id , initiative)
                .success(function(initiatives){
                    deferred.resolve(initiatives);
                });

            return deferred.promise;
			}	
			
		function makePayment(amount){
		 var deferred = $q.defer();
		 console.log("in makepayment on client");
            $http.get("/api/project/payment/amount/"+amount)
                .success(function(initiatives){
					console.log(initiatives);
                    deferred.resolve(initiatives);
                });

            return deferred.promise;
			};	
			
	}
})();