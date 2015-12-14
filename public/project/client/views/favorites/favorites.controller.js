(function(){
    angular
        .module("OneWorldCareApp")
        .controller("FavoritesController", FavoritesController);


    function FavoritesController($rootScope,UserService){
        var model = this;
        model.user = $rootScope.user;
        function init() {
            // console.log(model.user._id);
            UserService.findAllLikedBlogs(model.user._id)
                .then(function(blogs){
                    model.blogs = blogs;
                });

            UserService.findAllFundedInitiatives(model.user._id)
                .then(function(initiatives){
                    console.log("in init",initiatives);
                    model.initiatives = initiatives;
                });
        }
        init();
    }
})();
