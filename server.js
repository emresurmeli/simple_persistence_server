'use strict';

var express = require('express');
var app = express();
var userRoutes = express.Router();

require('./routes')(userRoutes);

app.use('/api', userRoutes);

app.listen(process.env.PORT || 3000, function() {
	console.log('server is running on localhost:3000');
});