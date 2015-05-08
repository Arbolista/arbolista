(function() {
	angular.module('arbolista').controller("BubblesController", BubblesController);

	BubblesController.$inject = ["$scope"];

	function BubblesController($scope) {
		var bc = this;
		$scope.container_style = {};
		$scope.details = undefined;
		$scope.slider_options = {};
		
		$scope.$on("arb_bubbles.details_click", function(event, node){
			$scope.$broadcast("arb_details:set_details", node);
			$scope.$broadcast("arb_slider:step_right");
		});
		
		$scope.$on("arb_details:close", function(){
			$scope.$broadcast("arb_slider:home");
		});
	}
})(); 