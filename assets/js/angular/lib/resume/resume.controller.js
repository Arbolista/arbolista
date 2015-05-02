(function() {
	angular.module('arbolista').controller("ResumeController", ResumeController);

	ResumeController.$inject = ["$scope"];

	function ResumeController($scope) {
		var rc = this;
		
		rc.bubbles = true;
		
		d3.json("/data/eric.json", function(error, root) {
			
		});
	}

})(); 