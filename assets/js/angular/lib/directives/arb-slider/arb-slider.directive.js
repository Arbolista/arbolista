(function(){
	angular.module("arbolista")
		.directive("arbSlider", arbSlider);
		
	arbSlider.$inject = [];
	
	function arbSlider(){
		return {
			templateUrl: "/templates/directives/arb-slider/arb-slider.html",
			restrict: "E",
			compile: compile,
			transclude: true,
			scope: {
				options: "="
			}
		};
		
		function compile(tElement, tAttrs, transclude) {
			return {
				pre: preLink,
				post: postLink
			};
		}
		
		function preLink($scope, iElement, iAttrs, controller){
			var $container = iElement.find(".arb-slider-container"),
				$slider = iElement.find(".arb-slider");
			
			$scope.container_style = $scope.container_style || {};
			$scope.slider_style = $scope.slider_style || {};
			
			$container.css($scope.container_style);
			$slider.css($scope.slider_style);

			$scope.close = function(){
				$slider.css("left", 0);
			};			
			
			$scope.$on("arb_slider:step_right", function(){
				$slider.animate({"left": "-100%"}, 750);
			});
			$scope.$on("arb_slider:home", function(){
				$slider.animate({"left": 0}, 750);
			});
		}
		function postLink($scope, iElement, iAttrs, controller){
			
		}

	}
	
})();