(function() {
	angular.module('arbolista').controller("HireUsController", HireUsController);

	HireUsController.$inject = ["$scope"];

	function HireUsController($scope) {
		$scope.email_attrs = $.param({
			subject: "Arbolista Contract Interest"
		});
	}

})(); 