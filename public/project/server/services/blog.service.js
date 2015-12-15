module.exports = function(app,model){
    app.get("/api/project/blog/:id", findBlogById);
    app.get("/api/project/blog", findAllBlogs);
    app.get("/api/project/blog/userId/:userid", findBlogByUserId);
    app.get("/api/project/blog/search/:searchString", findBlogBySearch);
    app.get("/api/project/blog/liked/:userId", findBlogsLikedByUser);
    app.post("/api/project/blog/userId/:userid", addBlog);
    app.put("/api/project/blog/:id", updateBlog);
    app.delete("/api/project/blog/:id", deleteBlog);
    app.put("/api/project/:id/blogcomment", addComment);



    function findBlogsLikedByUser(req, res){
        var userId = req.params.userId;
        model.getBlogsLikedByUserId(userId).then(function(blogs){
            res.json(blogs);
        });

    }


    function addComment(req, res){
        var comment = req.body;
        var blogId = req.params.id;
        model.addComment(blogId, comment).then(function(blog){
            res.json(blog);
        });

    }



    function findBlogBySearch(req, res) {
        var searchString = req.params.searchString;
        model
            .findBlogBySearch(searchString)
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
            .updateBlog(req.params.id, blog)
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