'use strict';

var fs = require('fs');
var bodyParser = require('body-parser');

function errorHandle(err, res) {
	console.log(err);
	return res.status(500).json({msg: 'server error'});
}

module.exports = function(router) {

	router.use(bodyParser.json());

	// GET
	router.get('/users', function(req, res) {
		fs.readdir('./data/', function(err, files) {
			if (err) {
				return errorHandle(err, res);
			}
			res.json(files);
		});
	});

	// POST
	router.post('/users', function(req, res) {
		
		var newUser = {
			name: req.body.name,
			age: req.body.age
		};

		var stringifyUser = JSON.stingify(newUser);
		var fileId;

		fs.readdir('./data/', function(err, files) {
			if (err) {
				return errorHandle(err, res);
			}
			fileId = files.length;
			var filePath = './data/file' + fileId + '.json';
			fs.writeFile(filePath, stringifyUser, function(err) {
				if (err) {
					console.log(err);
					return res.status(500).json({msg: 'server error'});
				}

				res.json({msg: 'success'});
			});
		});
	});

	//PUT
	router.put('/users/:id', function(req, res) {
		var update = JSON.stringify(req.body);
		var filePath = '/.data/' + req.params.id;
		fs.writeFile(filePath, update, function(err) {
			if (err) {
				return errorHandle(err, res);
			}

			res.json({msg: 'success'});
		});
	});

	//PATCH
	router.patch('/users/:id', function(req, res) {
		var filePath = '/.data/' + req.params.id;
		fs.readFile(filePath, function(err, data) {
			var user = JSON.parse(data);
			if(req.body.title) {
				console.log('')
			}
		});
	});
	//DELETE
	router.delete('/users/:id', function(req, res) {
		var filePath = '/.data/' + req.params.id;
		fs.unlink(filePath, function(err) {
			if (err) {
				return errorHandle(err, res);
			}

			res.json({msg: 'success'});
		});
	});
};





