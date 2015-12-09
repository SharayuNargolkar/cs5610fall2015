module.exports = function(app,model){
  app.get("/api/project/user/email=:email&password=:pword", findUserByEmailAndPassword);
  app.get("/api/project/user", findAllUsers);
  app.get("/api/project/user/username=:uname", findUserByUsername);
  app.get("/api/project/user/:id", findUserById);
 	app.post("/api/project/user", addUser);
  app.put("/api/project/user/:id", updateUser);
  app.delete("/api/project/user/:id", deleteUser) 
     
	  function addUser(req, res) {
        var user = req.body;
          model
            .createUser(user)
            .then(function(user){
                res.json(user);
            });
    }
    
    	  function findUserByEmailAndPassword(req, res) {
           var credentials = {"email" : req.params.email , "password" : req.params.pword};
           model
            .findUserByCredentials(credentials)
            .then(function(user){
               res.json(user);
            });
    }
    
    	  function findAllUsers(req, res) {
           model
            .findAllUsers()
            .then(function(users){
                res.json(users);
            });
    }
    
    	  function findUserByUsername(req, res) {
            model
            .findUserByUsername(req.params.username)
            .then(function(user){
                res.json(user);
            });
    }
    
    	  function findUserById(req, res) {
          model
            .findUserById(req.params.id)
            .then(function(user){
                res.json(user);
            });
    }
    
    	  function updateUser(req, res) {
        var user = req.body;
          model
            .updateUser(req.params.id, user)
            .then(function(users){
                res.json(users);
            });
        }
            
        function deleteUser(req, res) {
          model
            .deleteUser(req.params.id)
            .then(function(users){
                res.json(users);
            });
    }
};