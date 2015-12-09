// http://i18next.com/node/pages/doc_init.html
module.exports = function(app, handlers, fn){
	console.log("route and translate")
	var i18n = require("i18next");

	// Just set the value to the index where the language value
	i18n.init({ 
		lng: 'en', 
		detectLngFromPath: 0,
		supportedLngs: ['en', 'es'],
		preload: ['en', 'es'],
		userCookie: false,
		detectLngFromHeaders: false,
		fallbackLng: 'en',
		forceDetectLngFromPath: true,
		debug: true,
		resGetPath: __dirname + '/locales/__lng__.json'
	}, function(){

		app.use(i18n.handle);
		app.locals.i18n = i18n;
		
		/* About page. */
		app.get('/', handlers.fnAbout);
		app.get("/oportunidades", function(req, res, next){
			res.redirect('/es/trabaja-con-nosotros');
		});
		app.get("/opportunities", function(req, res, next){
			res.redirect('/es/work-with-us');
		});		

		/* Send Encrypted Email */
		app.get('/data/email', handlers.fnSendEmail);
		
		/* About page. */
		i18n.addRoute('/:lng', ['en', 'es'], app, 'get', handlers.fnAbout);
		i18n.addRoute('/:lng/routes.about', ['en', 'es'], app, 'get', handlers.fnAbout);	
		
		/* Hire Us page. */
		i18n.addRoute('/:lng/routes.hire_us', ['en', 'es'], app, 'get', handlers.fnHireUs);
		
		/* Work With Us page. */
		i18n.addRoute('/:lng/routes.work_with_us', ['en', 'es'], app, 'get', handlers.fnWorkWithUs);

		fn();
	});
};
