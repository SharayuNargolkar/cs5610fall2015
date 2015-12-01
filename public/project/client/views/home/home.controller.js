(function(){
    angular
        .module("OneWorldCareApp")
        .controller("HomeController", HomeController);
		
		
 function HomeController($scope){
   var model = this;
  model.myInterval = 2000;
  model.slides = [
    {
      image: './images/Volunteer.jpg',
      caption:'Be a Part of the Change'
    },
    {
      image: './images/Environment.jpg',
      caption: 'Join the caretakers'
    },
     {
      image: './images/Animal-Welfare.jpg',
      caption: 'We share this world with these amazing beings!'
    }
   ];
}
 })();

