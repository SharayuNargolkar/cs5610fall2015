var q = require("q");
//var users = require("./user.mock.json");

module.exports = function(db, mongoose, UserModel) {
    var BlogSchema = require("./blog.schema.js")(mongoose);
    var BlogModel  = mongoose.model("BlogModel", BlogSchema);
	    var api = {
        findBlogById: findBlogById,
        findBlogByUserId: findBlogByUserId,
        findAllBlogs: findAllBlogs,
        createBlog: createBlog,
       	deleteBlog: deleteBlog,
		updateBlog: updateBlog,
        findBlogBySearch: findBlogBySearch,
        addComment: addComment,
        getBlogsLikedByUserId: getBlogsLikedByUserId
    };
    return api;

    function getBlogsLikedByUserId(userId){

        var deferred = q.defer();
        var promises = [];
        var eventAttendByUser=[];
        UserModel.findById(userId).then(function(user){
            if(user){
                var blogArr = user.blogsliked;
                console.log(blogArr);
                for(var i = 0; i < blogArr.length; i++){
                    promises.push(BlogModel.findById(blogArr[i]));
                }

                q.all(promises).then(function(blogs){
                    deferred.resolve(blogs);
                });
            }
            else{

                deferred.reject("User has not liked any blogst");
            }
        });

        return deferred.promise;
    }

    function addComment(blogId, newcomment){

        var deferred = q.defer();
        console.log(blogId);
        BlogModel.findById(blogId, function(err, blog){
            blog.comments.push(newcomment);

            blog.save(function(err, blog){
                deferred.resolve(blog);
            });
        });

        return deferred.promise;
    }


    function findBlogBySearch(searchString){
        var deferred = q.defer();
        BlogModel.find({$or: [{title: { $regex: searchString, $options: 'i' } }, {'author.authorName': { $regex: searchString, $options: 'i' }}]} , function(err, blogs){
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
                 deferred.resolve(blog);
            }
        });

        return deferred.promise;
    };
    
	function findBlogByUserId(userId){
         var deferred = q.defer();

        BlogModel.find({'author.authorId' : userId}, function(err, blogs){
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