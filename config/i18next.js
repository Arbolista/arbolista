// http://i18next.com/node/pages/doc_init.html
var i18n = require("i18next");

// Just set the value to the index where the language value
i18n.init({ 
	lng: 'en', 
	detectLngFromPath: 0,
	supportedLngs: ['en'],
	userCookie: false,
	detectLngFromHeaders: false,
	fallbackLng: 'en',
	debug: true,
	resGetPath: __dirname + '/locales/__lng__.json'
});

module.exports = i18n;