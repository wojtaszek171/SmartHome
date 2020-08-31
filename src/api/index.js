var express = require('express');        
var app = express();                 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;  
const router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'API is Online!' });   
});

app.use('/api', router);
app.listen(port);
console.log('Listening on port ' + port);
