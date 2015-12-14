var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(db, mongoose) {
    var BlogSchema = require("./blog.schema.js")(mongoose);
    var BlogModel  = mongoose.model("BlogModel", BlogSchema);
	    var api = {
        findBlogById: findBlogById,
        findBlogByUserId: findBlogByUserId,
        findAllBlogs: findAllBlogs,
        createBlog: createBlog,
        createComment: createComment,
		deleteBlog: deleteBlog,
		updateBlog: updateBlog,
            findBlogBySearch: findBlogBySearch
    };
    return api;


    function findBlogBySearch(title){
        var deferred = q.defer();
        BlogModel.find({ title: { $regex: title, $options: 'i' } } , function(err, blogs){
            if(err) {
                deferred.reject(err);
            } else {
               deferred.resolve(blogs);
            }
        });

        return deferred.promise;
    };
	
    function findBlogById(id){
        var deferred = q.defer();

        BlogModel.find({_id : id}, function(err, blog){
            if(err) {
                deferred.reject(err);
            } else {
                console.log(blog);
               deferred.resolve(blog);
            }
        });

        return deferred.promise;
    };
    
	function findBlogByUserId(userId){
         var deferred = q.defer();

        BlogModel.find({authorId : userId}, function(err, blogs){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(blogs);
                }
            });

        return deferred.promise;
    };
    
    function findAllBlogs(){
       var deferred = q.defer();

       BlogModel.find(function(err, users){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
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
    
    function createBlog(blog){
     var deferred = q.defer();
       BlogModel.create(blog, function(err, blog) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(blog);
            }
        });

        return deferred.promise;
    };
	
    
        function createComment(user){
    //  var deferred = q.defer();

    //     BlogModel.create(user, function(err, blog) {
    //         if(err) {
    //             deferred.reject(err);
    //         } else {
    //           //deferred.resolve( findUserById(user._id));
    //             deferred.resolve(blog);
    //         }
    //     });

    //     return deferred.promise;
    };
    
    function deleteBlog(id){
        var deferred = q.defer();

        BlogModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    };
    
    
    function updateBlog(id, blog){
        var deferred = q.defer();

        delete blog._id;
        BlogModel.update({_id: id}, {$set: blog},
            function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(findBlogById(id));
                    }
            });
            
        return deferred.promise;
};

};