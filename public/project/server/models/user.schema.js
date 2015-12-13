module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
                firstname: String,
                lastname: String,
                username: String,
                password: String,
                email: String,
                roles: [String],
                country:String,
                state: String,
                myblogs: [String],
                myinitiatives: [String],
                paypalemail: String
               
       
    }, {collection: "cs5610.project.user"});

    return UserSchema;
};