var q = require("q");
var forms = require("./form.mock.json");
module.exports = function(app) {
	    var api = {
            getAllForms: getAllForms,
			findFormById: findFormById,
			findFormByTitle: findFormByTitle,
			createFormForUser: createFormForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById,
			findAllFieldsForForm:findAllFieldsForForm,
			createField:createField,
			deleteField:deleteField
    };
    return api;
	
    function getAllForms(id){
		 var deferred = q.defer();
		 var formsofuser = [];
		  for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].userId == id) {
        		 	formsofuser.push(forms[i]);}
				 else continue;
   			 }
		console.log(formsofuser);
		deferred.resolve(formsofuser);
        return deferred.promise;
		}
		
		 function findFormById(id){
		 var deferred = q.defer();
		  for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].id == id) {
        		 	deferred.resolve(forms[i]);
					 break;}
				 else continue;
   			 }
	        return deferred.promise;
		}
			
				
		function findFormByTitle(title){
		 		 var deferred = q.defer();
		  for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].title == title) {
        		 	deferred.resolve(forms[i]);
					 break;}
				 else continue;
   			 }
	        return deferred.promise;
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

		function createFormForUser(userId, form){
			form.id = guid();
			form.userId = userId;
			form.fields = [];
			 var deferred = q.defer();
			 forms.push(form);
			     deferred.resolve(forms);
        return deferred.promise;
		}
		
		function deleteFormById(formId){
			 var deferred = q.defer();	
			 for(var i = 0; i < forms.length; i++) {
				 if (forms[i].id == formId){
						forms.splice(i,1);
					    
						break;} 
				 else continue;
			 }
	      deferred.resolve(forms);
		  return deferred.promise;
		}
		
		function updateFormById(formId, newForm){
			var deferred = q.defer();
			for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].id == formId) {
        		 	forms[i] = newForm;
					var updated_form = forms[i];
				 	break;}
				 else updated_form = null;
   			 }
		 deferred.resolve(updated_form);
        return deferred.promise;
			
			}	
			
	function findAllFieldsForForm(formId){
		var deferred = q.defer();
		 var fieldsofforms = [];
		  for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].id == formId) {
        		 	fieldsofforms = forms[i].fields;
					 break;}
				 else continue;
   			 }
		console.log(fieldsofforms);
		deferred.resolve(fieldsofforms);
        return deferred.promise;
	}
	
	function createField(formId, field){
		 field.id = guid();
		 var deferred = q.defer();
		 for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].id == formId) {
					forms[i].fields.push(field)
        		 	deferred.resolve(forms[i]);
					 break;}
				 else continue;
   			 }
	      return deferred.promise;
		}
	
	function deleteField(formId, fieldId){
		 var deferred = q.defer();
		 
		 for(var i = 0; i < forms.length; i++) {
        		 if (forms[i].id == formId) {
					for(var j = 0; j < forms[i].fields.length; j++) {
						if (forms[i].fields[j].id == fieldId){
							forms[i].fields.splice(j,1);
							break;} 
							else continue;
					}
					deferred.resolve(forms[i]);
					 break;}
				 else continue;
   			 }
	      return deferred.promise;
	}
	
};