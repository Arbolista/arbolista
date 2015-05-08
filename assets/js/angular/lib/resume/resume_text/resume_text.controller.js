(function() {
	angular.module('arbolista').controller("TextController", TextController);

	TextController.$inject = ["$scope"];

	function TextController($scope) {
		var tc = this;
		
		$scope.about = findInArray($scope.resume.children, "key", "about");
		$scope.education = findInArray($scope.resume.children, "key", "education");
		$scope.experience = findInArray($scope.resume.children, "key", "experience");
		$scope.programming = findInArray($scope.experience.children, "key", "programming");
		$scope.non_programming = findInArray($scope.experience.children, "key", "non_programming");
		$scope.open_source = findInArray($scope.experience.children, "key", "open_source");
		$scope.skills = findInArray($scope.resume.children, "key", "skills");
		
	}	
	
	function findInArray(a, key, value){
		for (var i=0; i<a.length; i++){
			if (a[i][key] === value) return a[i];
		}
	}
})(); 