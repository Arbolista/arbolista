// http://i18next.com/node/pages/doc_init.html
module.exports = function(app, handlers, fn){
	var i18n = require("i18next");

	// Just set the value to the index where the language value
	i18n.init({ 
		lng: 'en', 
		detectLngFromPath: 0,
		supportedLngs: ['en', 'es', 'pt'],
		preload: ['en', 'es', 'pt'],
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
		app.get('/about', handlers.fnAbout);
		
		/* Hire Us page. */
		app.get('/hire-us', handlers.fnHireUs);
		
		/* Work With Us page. */
		app.get('/work-with-us', handlers.fnWorkWithUs);
		
		/* About page. */
		i18n.addRoute('/:lng', ['en', 'es', 'pt'], app, 'get', handlers.fnAbout);
		i18n.addRoute('/:lng/routes.about', ['en', 'es', 'pt'], app, 'get', handlers.fnAbout);	
		
		/* Hire Us page. */
		i18n.addRoute('/:lng/routes.hire_us', ['en', 'es', 'pt'], app, 'get', handlers.fnHireUs);
		
		/* Work With Us page. */
		i18n.addRoute('/:lng/routes.work_with_us', ['en', 'es', 'pt'], app, 'get', handlers.fnWorkWithUs);

		fn();
	});
};
