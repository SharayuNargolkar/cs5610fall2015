module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
                firstname: String,
                lastname: String,
                username: String,
                password: String,
                email: String,
                country:String,
                state: String
               
       
    }, {collection: "cs5610.project.user"});

    return UserSchema;
};