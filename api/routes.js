var express = require('express');
var path = require('path');

var router = express.Router();
var itemController = require('../db_controllers/itemController.js');
var userController = require('../db_controllers/userController.js');
var requestController = require('../db_controllers/requestController.js');
var lessonController = require('../db_controllers/lessonController.js');


/*module.exports = function(app) {
	app.get('/api/search/results', function(req, res){

		res.send()
	});*/

	var userPath = '/user';
	router.get(path.join(userPath, '/'), userController.list);
	router.get(path.join(userPath, '/:id'), userController.show);
	router.post(path.join(userPath, '/'), userController.create);
	router.put(path.join(userPath, '/:id'), userController.update);
	router.delete(path.join(userPath, '/:id'), userController.remove);

	var itemPath = '/item';
	router.get(path.join(itemPath, '/'), itemController.list);
	router.get(path.join(itemPath, '/:id'), itemController.show);
	router.post(path.join(itemPath, '/'), itemController.create);
	router.put(path.join(itemPath, '/:id'), itemController.update);
	router.delete(path.join(itemPath, '/:id'), itemController.remove);

	var lessonPath = '/lesson';
	router.get(path.join(lessonPath, '/'), lessonController.list);
	router.get(path.join(lessonPath, '/:id'), lessonController.show);
	router.post(path.join(lessonPath, '/'), lessonController.create);
	router.put(path.join(lessonPath, '/:id'), lessonController.update);
	router.delete(path.join(lessonPath, '/:id'), lessonController.remove);

	var requestPath = '/request';
	router.get(path.join(requestPath, '/'), requestController.list);
	router.get(path.join(requestPath, '/:id'), requestController.show);
	router.post(path.join(requestPath, '/'), requestController.create);
	router.put(path.join(requestPath, '/:id'), requestController.update);
	router.delete(path.join(requestPath, '/:id'), requestController.remove);

//};

module.exports = router;
