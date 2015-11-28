var q = require("q");
var forms = require("./form.mock.json");
module.exports = function(db, mongoose) {
	var FormSchema = require("./form.schema.js")(mongoose);
	var FormModel  = mongoose.model("FormModel", FormSchema);
	
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
		  FormModel.find({userId : id}, function(err, forms){
            if(err) {
                deferred.reject(err);
            } else {
                formsofuser = forms;
				deferred.resolve(formsofuser);
            }
        });
        return deferred.promise;
		}
		
		 function findFormById(id){
		 var deferred = q.defer();
			FormModel.find({_id : id}, function(err, form){
						if(err) {
							deferred.reject(err);
						} else {
						deferred.resolve(form);
						}
			});
	      return deferred.promise;
		}
			
				
		function findFormByTitle(title){
		 		 var deferred = q.defer();
	 FormModel.find({title : title}, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
              deferred.resolve(form);
            }
	     });
		 return deferred.promise;
		} ;	
		
		
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
		
			FormModel.create(form, function(err, forms) {
				if(err) {
					deferred.reject(err);
				} else {
				deferred.resolve(forms);
				}
			});
			return deferred.promise;
			}
		
		function deleteFormById(formId){
			 var deferred = q.defer();	
			FormModel.remove({_id: formId}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
	       return deferred.promise;
		}
		
		function updateFormById(formId, newForm){
			var deferred = q.defer();
			delete newForm._id;
    FormModel.update({_id: formId}, {$set: newForm},
        function(err,forms){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(findFormById(formId));
            }
        });
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
		 
		FormModel.remove({_id: formId}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
	      return deferred.promise;
	}
	
};