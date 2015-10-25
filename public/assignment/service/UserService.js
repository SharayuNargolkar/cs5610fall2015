(function()
{
	angular
		.module("FormBuilderApp")
		.factory("UserService", userService);
		
	function userService()
	{
		var users = [
			{username:"Alice" , password:"alice123"}
			
		];
		
		
		
		var service = {
			findAllUsers: findAllUsers,
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return service;
		
		function findAllUsers(callback)
		{
			callback(users);
		}
		
		function findUserByUsernameAndPassword(username,password,callback){
			for(var i = 0; i < users.length; i++) {
        		 if (users[i].username == username && users[i].password == password) {
        		 	var user = users[i];
				 	break;}
				 else user = null;
   			 }
			callback(user);
			}	
		
		
		function createUser(user, callback)
		{
			users.push(user);
			callback(users);
		}
		
		function deleteUserById(id, callback)
		{
			users.splice(id, 1);
			callback(users);
		}
		
		function updateUser(id, user, callback)
		{
			
		}
	}
})();