(function(){
    angular
        .module("OneWorldCareApp")
        .controller("UserHomeController", UserHomeController);


    function UserHomeController($rootScope){
        var model = this;
        model.user = $rootScope.user;
        model.toggle = toggle;

        model.mainToggleClass = "col-xs-12";
        model.sideBarToggleClass = "col-xs-6";
        model.toggleShow = false;

        function toggle() {
            if(model.toggleShow) {
                model.mainToggleClass = "col-xs-12";
                model.toggleShow = false;
            }
            else
            {
                model.mainToggleClass = "col-xs-6";
                model.toggleShow = true;
            }
//            model.toggleShow = !model.toggleShow;
        }
    }
})();
