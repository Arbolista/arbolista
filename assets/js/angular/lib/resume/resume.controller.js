(function() {
	angular.module('arbolista').controller("ResumeController", ResumeController);

	ResumeController.$inject = ["$scope", "$state"];

	function ResumeController($scope, $state){
		var rc = this,
			format = localStorage.resume_format;
		rc.format = format;
			
		$scope.toggleFormat = function(){
			if (rc.format === "bubbles"){
				setFormat("text");
			} else {
				setFormat("bubbles");
			}
		};
		
		function setFormat(format){
			format = format || "bubbles";
			if (format === "text"){
				$state.go("text");
			} else {
				format = "bubbles";
				$state.go("bubbles");
			}
			rc.format = format;
			localStorage.resume_format = format;			
		}
		
		var lang = $("html").attr("lang");
		d3.json("/data/"+lang+"/eric.json", function(error, data) {
			$scope.resume = data;
			setFormat(format);
		});		
	}

})(); 