"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);
        function FormController($rootScope, $scope, FormService) {
        $scope.userid = $rootScope.userid
        $scope.forms = FormService.getAllForms();
                     
         $scope.addForm = function(){
            FormService.createFormForUser($scope.userid, $scope.newform, function(value){
            console.log(value);                                              
            });
            $scope.newform = null;
         };
       
          $scope.updateForm = function(){
             FormService.updateFormById($scope.newform.id, $scope.newform, function(value){
             console.log(value);                                              
             });
            $scope.newform = null;
          };
       
          $scope.deleteForm = function($index){
            FormService.deleteFormById($index, function(value){
            console.log(value);                                              
            });
          };
       
          $scope.selectForm = function($index){
            $scope.newform  = $scope.forms[$index];
          };
    }
})();