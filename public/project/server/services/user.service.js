module.exports = function(app, User, passport){


    app.get("/rest/user/:id", function(req, res)
    {
        isUserAdmin(req.user.username, function(user)
        {
            if(user != '0' || req.user._id == req.params.id)
            {
                User.findById(req.params.id, function(err, user)
                {
                    res.send(user);
                });
            }
        });
    });

    app.delete("/api/project/user/:id", function(req, res)
    {
        isUserAdmin(req.user.username, function(user)
        {
            if(user != '0')
            {
                User.remove({_id : req.params.id}, function(err, count)
                {
                    res.send(count);
                });
            }
        });
    });

    app.get("/api/project/user", function(req, res)
    {
        isUserAdmin(req.user.username, function(user)
        {
            if(user != '0')
            {
                User.find(function(err, users)
                {
                    res.json(users);
                });
            }
        });
    });

    app.post("/api/project/user", function(req, res)
    {
        var user = req.body
        if(user.roles)
        {
            user.roles = user.roles.split(",");
        }
        else
        {
            user.roles = ["user"];
        }
        User.findOne({username: user.username}, function(err, existingUser)
        {
            if(existingUser != null)
            {
                res.json(null);
                return;
            }
            else
            {
                User.create(user, function(err, result)
                {

                    res.json(result);
                });
            }
        });
    });

    app.post("/rest/login", passport.authenticate('local'), function(req, res)
    {   var user = req.body;
        User.findOne({username: user.username, password: user.password}, function(err, foundUser)
        { if(err){
            res.send(null);
        } else
            res.json(foundUser);
        });
    });

    app.put("/rest/update", function(req, res)
    {
        var userid = req.body._id;
        delete req.body._id;
        User.update({_id: userid},{$set: req.body},function(err, count)
            {
                res.send(count);
            });
    });

    app.get('/rest/loggedin', function(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/api/project/logout', function(req, res)
    {
        req.logOut();
        res.send(200);
    });

    app.get('/rest/admin', function(req, res)
    {
        if(req.isAuthenticated())
        {
            User.findOne({username: req.user.username}, function(err, foundUser)
            {
                if(foundUser.roles.indexOf('admin') > -1)
                {
                    res.json(foundUser);
                }
                else
                {
                    res.send('0');
                }
            });
        }
        else
        {
            res.send('0');
        }
    });

    function isUserAdmin(username, callback)
    {
        User.findOne({username: username}, function(err, foundUser)
        {
            if(foundUser.roles.indexOf('admin') > -1)
            {
                callback(foundUser);
            }
            else
            {
                callback('0');
            }
        });
    }


};