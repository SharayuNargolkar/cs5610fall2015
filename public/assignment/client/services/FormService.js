"use strict";
(function(){
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);
		
	function FormService()
	{
		var forms = [
			//{name:"myform", userid: 23, id: 1},
			//{name:"myform1", userid: 23, id: 2}
			
		];
		
	   var service = {
			getAllForms: getAllForms,
			findAllFormsForUser: findAllFormsForUser,
			createFormForUser: createFormForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};
		return service;
		
		function getAllForms(){
		  return forms;	
		}
		
		function findAllFormsForUser(userId, callback)
		{   var formsofuser = [];
			for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].userid== userId) {
        		 	formsofuser.push(forms[i]);}
				 else continue;
   			 }
			callback(formsofuser);
			}	
					
		function guid() {
  			function s4() {
  				  return Math.floor((1 + Math.random()) * 0x10000)
  				    .toString(16)
				      .substring(1);
			  }
 			 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
 			   s4() + '-' + s4() + s4() + s4();
		} 

		function createFormForUser(userId, form, callback){
			form.id = guid();
			form.userid = userId;
			forms.push(form);
			callback(form);
		}
		
		function deleteFormById(formId, callback){	
			forms.splice(formId, 1);
			callback(forms);
		}
		
		function updateFormById(formId, newForm, callback){
			for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].id == formId) {
        		 	forms[i] = newForm;
					var updated_form = forms[i];
				 	break;}
				 else updated_form = null;
   			 }
			callback(updated_form);
			}	
			
	}
})();