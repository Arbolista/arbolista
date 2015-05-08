(function() {
	angular.module("arbolista").directive("arbDetails", arbDetails);

	arbDetails.$inject = [];

	function arbDetails() {
		return {
			templateUrl : "/templates/directives/arb-details/arb_details.html",
			restrict : "E",
			compile : compile,
			scope : true
		};

		function compile(tElement, tAttrs, transclude) {
			return {
				pre : preLink,
				post : postLink
			};
		}

		function preLink($scope, iElement, iAttrs, controller) {
			$scope.close = function(){
				$scope.$emit("arb_details:close");
			};
			$scope.$on("arb_details:set_details", function(event, node){
				$scope.$apply(function(){ $scope.node = node; });
			});
		}

		function postLink($scope, iElement, iAttrs, controller) {

		}

	}

})(); 