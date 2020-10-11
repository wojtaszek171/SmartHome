var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from sensors', function (error, results, fields) {
		if (error) throw error;
		const result = {};
		results.forEach(sensor => {
			const { NAME, VALUE, DATE_UPDATED } = sensor;
			result[NAME] = {
				name: NAME,
				value: VALUE,
				date: DATE_UPDATED
			}			
		});

		
		res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
	});
});

module.exports = router;
