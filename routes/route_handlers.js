var fnAbout = function(req, res, next) {
	  res.render('about', { title: 'arbolista', current_page: "about"});
	},
	fnHireUs = function(req, res, next) {
	  res.render('hire_us', { title: 'arbolista', current_page: "hire_us" });
	},
	fnWorkWithUs = function(req, res, next) {
	  res.render('work_with_us', { title: 'arbolista', current_page: "work_with_us" });
	};

module.exports = {
	fnAbout: fnAbout,
	fnHireUs: fnHireUs,
	fnWorkWithUs: fnWorkWithUs
};