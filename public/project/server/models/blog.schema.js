module.exports = function(mongoose) {

    var BlogSchema = mongoose.Schema({
                title: String,
                content: String,
                likes:[{count: Number , name:String}],
                author:{authorId: String, authorName: String},
                created: Date,
                comments: [{content: String , name:String}],

       
    }, {collection: "cs5610.project.blog"});

    return BlogSchema;
};