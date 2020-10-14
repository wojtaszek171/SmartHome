var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	try {
		mysqlPool.getConnection(function(err, connection) {
			connection.query('SELECT * from sensors', function (error, results, fields) {
				const result = {};
				results && results.forEach(sensor => {
					const { NAME, VALUE, DATE_UPDATED } = sensor;
					result[NAME] = {
						name: NAME,
						value: VALUE,
						date: DATE_UPDATED
					}			
				});
	
				res.send(JSON.stringify({"error": error, "response": result}));
				connection.release();
			});
		});
		
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
