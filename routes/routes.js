'use strict';

var fs = require('fs');
var bodyParser = require('body-parser');

module.exports = function(router) {

	router.use(bodyParser.json());

	router.get('/users', function(req, res) {
			fs.readdir('./data/', function(err, files) {
				if (err) {
					console.log(err);
					return res.status(500).json({msg: 'server error'});
				}

				res.json(files);
			});
	});

	router.post('/rants', function(req, res) {
		
		var newUser = {
			name: req.body.name,
			age: req.body.age
		};

		var stringifyUser = JSON.stringify(newUser)
	});
};