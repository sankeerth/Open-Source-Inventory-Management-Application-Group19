var express = require('express');
var mongoose = require('mongoose');
var app = express();

app.use(express.static('./client'));

//require('./api/routes')(app);

var apiRoutes = require('./api/routes.js');

app.use('/api', apiRoutes);

app.get('*', function (req, res) {
	res.sendFile('/client/views/index.html', { root: __dirname });
});

//console.log(app._router);

mongoose.connect('mongodb://localhost/inventory');

app.listen(8080, function () {
	console.log('Server is running.')
});