module.exports = function(mongoose) {

    var BlogSchema = mongoose.Schema({
                title: String,
                content: String,
                likes: String,
                authorId: String,
                created: Date,
                comments: [{content: String , name:String, time: Date}],
          
       
    }, {collection: "cs5610.project.blog"});

    return BlogSchema;
};