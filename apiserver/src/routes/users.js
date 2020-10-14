var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from users', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;
