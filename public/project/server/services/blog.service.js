module.exports = function(app,model){
  app.get("/api/project/blog/:id", findBlogById);
  app.get("/api/project/blog", findAllBlogs);
  app.get("/api/project/blog/userId/:userid", findBlogByUserId);
  app.get("/api/project/blog/search/:title", findBlogBySearch);
  app.post("/api/project/blog/userId/:userid", addBlog);
  app.put("/api/project/blog/:id", updateBlog);
  app.delete("/api/project/blog/:id", deleteBlog)

    function findBlogBySearch(req, res) {
        var title = req.params.title;
        model
            .findBlogBySearch(title)
            .then(function(blog){
                res.json(blog);
            });
    }


	  function addBlog(req, res) {
        var blog = req.body;
        model
            .createBlog(blog)
            .then(function(blog){
                res.json(blog);
            });
    }
    
    	  function findBlogById(req, res) {
           model
            .findBlogById(req.params.id)
            .then(function(blog){
               res.json(blog);
            });
    }
    
    	  function findAllBlogs(req, res) {
           model
            .findAllBlogs()
            .then(function(blogs){
                res.json(blogs);
            });
    }
    
      
    	  function findBlogByUserId(req, res) {
           model
            .findBlogByUserId(req.params.userid)
            .then(function(blog){
                res.json(blog);
            });
    }
    
    	  function updateBlog(req, res) {
        var blog = req.body;
          model
            .updateUser(req.params.id, blog)
            .then(function(blogs){
                res.json(blogs);
            });
        }
            
        function deleteBlog(req, res) {
          model
            .deleteBlog(req.params.id)
            .then(function(blogs){
                res.json(blogs);
            });
    }
};