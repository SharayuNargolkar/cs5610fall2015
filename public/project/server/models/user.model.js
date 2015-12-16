var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var RegUserModel  = mongoose.model("RegUserModel", UserSchema);
	    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
		deleteUserById: deleteUserById,
		updateUser: updateUser
    };
    return RegUserModel;

    passport.use(new LocalStrategy(
        function(email, password, done)
        {
            UserModel.findOne({email: email, password: password}, function(err, user)
            {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            })
        }));

    passport.serializeUser(function(user, done)
    {
        done(null, user);
    });

    passport.deserializeUser(function(user, done)
    {
        UserModel.findById(user._id, function(err, user)
        {
            done(err, user);
        });
    });

    app.post("/login", passport.authenticate('local'), function(req, res)
    {
        var user = req.user;
        res.json(user);
    });

    app.get('/loggedin', function(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/logout', function(req, res)
    {
        req.logOut();
        res.send(200);
    });

    app.post('/register', function(req, res)
    {
        var newUser = req.body;
        newUser.roles = ['student'];
        UserModel.findOne({username: newUser.username}, function(err, user)
        {
            if(err) { return next(err); }
            if(user)
            {
                res.json(null);
                return;
            }
            var newUser = new UserModel(req.body);
            newUser.save(function(err, user)
            {
                req.login(user, function(err)
                {
                    if(err) { return next(err); }
                    res.json(user);
                });
            });
        });
    });

    var auth = function(req, res, next)
    {
        if (!req.isAuthenticated())
        {
            res.send(401);
        }
        else
        {
            next();
        }
    };


    function findUserById(id){
        var deferred = q.defer();

        RegUserModel.find({_id : id}, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {

               deferred.resolve(user);
            }
        });

        return deferred.promise;
    };
    
	function findUserByUsername(username){
         var deferred = q.defer();

        RegUserModel.find({username : username}, function(err, users){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;
    };
    
    function findAllUsers(){
       var deferred = q.defer();

       RegUserModel.find(function(err, users){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    };
    
	function findUserByCredentials(credentials){
       var deferred = q.defer();

       RegUserModel.find({email : credentials.email, password : credentials.password},function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
               deferred.resolve(user);
            }
        });

        return deferred.promise;
    };
    	
        function guid() {
  			function s4() {
  				  return Math.floor((1 + Math.random()) * 0x10000)
  				    .toString(16)
				      .substring(1);
			  }
 			 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
 			   s4() + '-' + s4() + s4() + s4();
		} ;
    
    function createUser(user){
     var deferred = q.defer();

        RegUserModel.create(user, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
              //deferred.resolve( findUserById(user._id));
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    };
	
    function deleteUserById(id){
        var deferred = q.defer();

        RegUserModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    };
    
    
    function updateUser(id, user){
        var deferred = q.defer();

        delete user._id;
        RegUserModel.update({_id: id}, {$set: user},
            function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(findUserById(id));
                    }
            });
            
        return deferred.promise;
};

};