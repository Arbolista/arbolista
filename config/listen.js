module.exports = function(app){
  console.log("Listen")
	var server = app.listen(process.env.PORT || 3000, function () {
	
	  var host = server.address().address;
	  var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
    // compile CSS and Javascript library into application.js & application.css
    app.use(require("connect-assets")({
      paths: ["assets/js", "assets/css", "bower_components"]
    }));	
	});
};
