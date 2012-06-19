/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.locals.msg = req.session.success;
	delete req.session.success;
	res.render('index', { title: 'Upload Dir', msg: null });
};
