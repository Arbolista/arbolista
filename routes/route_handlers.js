var fnAbout = function(req, res, next) {
	  res.render('about', { title: 'arbolista', current_page: "about"});
	},
	fnHireUs = function(req, res, next) {
	  res.render('hire_us', { title: 'arbolista', current_page: "hire_us" });
	},
	fnWorkWithUs = function(req, res, next) {
	  res.render('work_with_us', { title: 'arbolista', current_page: "work_with_us" });
	},
	fnSendEmail = function(req, res, next){
		var pwd = Math.random().toString(36).slice(-8),
			enc_email = encrypt(pwd);
		res.setHeader('Content-Type', 'application/json');
    	res.end(JSON.stringify({ a: pwd, 
    							 b: enc_email }));
	};

module.exports = {
	fnAbout: fnAbout,
	fnHireUs: fnHireUs,
	fnWorkWithUs: fnWorkWithUs,
	fnSendEmail: fnSendEmail
};

function encrypt(password) {
  var forge = require('node-forge');
  var input = email = "eric+arbolista-no_spam@arbol.org";

  // 3DES key and IV sizes
  var keySize = 24;
  var ivSize = 8;

  // get derived bytes
  // Notes:
  // 1. If using an alternative hash (eg: "-md sha1") pass
  //   "forge.md.sha1.create()" as the final parameter.
  // 2. If using "-nosalt", set salt to null.
  var salt = forge.random.getBytesSync(8);
  // var md = forge.md.sha1.create(); // "-md sha1"
  var derivedBytes = forge.pbe.opensslDeriveBytes(
    password, salt, keySize + ivSize/*, md*/);
  var buffer = forge.util.createBuffer(derivedBytes);
  var key = buffer.getBytes(keySize);
  var iv = buffer.getBytes(ivSize);

  var cipher = forge.cipher.createCipher('3DES-CBC', key);
  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(input, 'binary'));
  cipher.finish();

  var output = forge.util.createBuffer();

  // if using a salt, prepend this to the output:
  if(salt !== null) {
    output.putBytes('Salted__'); // (add to match openssl tool output)
    output.putBytes(salt);
  }
  output.putBuffer(cipher.output);
  
  return output.getBytes()
}