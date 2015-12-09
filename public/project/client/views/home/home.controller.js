(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HomeController", HomeController);
		
		
 function HomeController($scope){
   var model = this;
  model.myInterval = 1600;
  model.slides = [
    {
      image: './images/Volunteer.jpg',
      caption:'Be a Part of the Change, support those in the front line of the action!'
    },
    {
      image: './images/Environment.jpg',
      caption: 'For people wanting to make a difference.. affect change....'
    },
     {
      image: './images/Animal-Welfare.jpg',
      caption: 'We share this world with these amazing beings!'
    }
   ];
}
 })();

