(function(){
	
	angular.module("arbolista").config(fnConfig);
		
	fnConfig.$inject = ["$stateProvider"];
	
	function fnConfig($stateProvider) {
	  //
	  // Now set up the states
	  $stateProvider
	    .state('bubbles', {
	      templateUrl: "/templates/resume/resume_bubbles/resume_bubbles.html",
	      controller: "BubblesController as bc"
	    })
	    .state('text', {
	      templateUrl: "/templates/resume/resume_text/resume_text.html",
	      controller: "TextController as tc"
	    });
	}
	
})();
