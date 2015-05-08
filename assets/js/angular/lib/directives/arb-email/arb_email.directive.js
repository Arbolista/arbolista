(function() {
	angular.module("arbolista").directive("arbEmail", arbEmail);

	arbEmail.$inject = ["$http"];

	function arbEmail($http) {
		return {
			templateUrl : "/templates/directives/arb-email/arb_email.html",
			restrict : "E",
			compile : compile,
			scope : {
				attrs: "="
			}
		};

		function compile(tElement, tAttrs, transclude) {
			return {
				pre : preLink,
				post : postLink
			};
		}

		function preLink($scope, iElement, iAttrs, controller) {
			$scope.waiting = false;
			$scope.getEmail = function(){
				$scope.waiting = true;
				$http({
					url: "/data/email"
				}).success(function(res, status, headers, config){
					var pwd = res.a,
						enc_email = res.b;
					// outputs decrypted hex
					$scope.email = email = decrypt(enc_email, pwd);
					$scope.waiting = false;
				});
			};
		}

		function postLink($scope, iElement, iAttrs, controller) {

		}

	}
	
	// openssl enc -d -des3 -in input.enc -out input.dec.txt
	function decrypt(input, pwd) {
	
	  // parse salt from input
	  input = forge.util.createBuffer(input, 'binary');
	  // skip "Salted__" (if known to be present)
	  input.getBytes('Salted__'.length);
	  // read 8-byte salt
	  var salt = input.getBytes(8);
	
	  // Note: if using "-nosalt", skip above parsing and use
	  // var salt = null;
	
	  // 3DES key and IV sizes
	  var keySize = 24;
	  var ivSize = 8;
	
	  var derivedBytes = forge.pbe.opensslDeriveBytes(
	    pwd, salt, keySize + ivSize);
	  var buffer = forge.util.createBuffer(derivedBytes);
	  var key = buffer.getBytes(keySize);
	  var iv = buffer.getBytes(ivSize);
	
	  var decipher = forge.cipher.createDecipher('3DES-CBC', key);
	  decipher.start({iv: iv});
	  decipher.update(input);
	  var result = decipher.finish(); // check 'result' for true/false
	
	  return decipher.output.getBytes();
	}	

})(); 