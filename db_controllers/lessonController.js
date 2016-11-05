var lessonModel = require('../models/lessonModel.js');

var list = function(req, res){
    lessonModel.find(function(err, lessons){
        if(err){
            return res.status(500).json({
                message: 'Error when getting lesson',
                error: err
            })
        }
        return res.json(lessons);
    })
};

var show = function (req, res) {
    var id = req.params.id;
    lessonModel.findOne({_id: id}, function (err, lesson) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting lesson',
                error: err
            });
        }
        if (!lesson) {
            return res.status(404).json({
                message: 'No such lesson'
            });
        }
        return res.json(lesson);
    })
};

var create = function (req, res) {
    var lesson = new lessonModel({
        name: req.body.name,
        quantity: req.body.quantity,
        rentCost: req.body.rentCost,
        purchaseCost: req.body.purchaseCost
    });

    lesson.save(function (err, lesson) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating lesson',
                error: err
            });
        }
        return res.status(201).json(lesson);
    })
};

var update = function (req, res) {
    var id = req.params.id;
    lessonModel.findOne({_id: id}, function (err, lesson) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting lesson',
                error: err
            });
        }
        if (!lesson) {
            return res.status(404).json({
                message: 'No such lesson'
            });
        }

        lesson.name = req.body.name ? req.body.name : lesson.name;
        lesson.quantity = req.body.quantity ? req.body.quantity : lesson.quantity;
        lesson.rentCost = req.body.rentCost ? req.body.rentCost : lesson.rentCost;
        lesson.purchaseCost = req.body.purchaseCost ? req.body.purchaseCost : lesson.purchaseCost;

        lesson.save(function (err, lesson) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating lesson.',
                    error: err
                });
            }

            return res.json(lesson);
        });
    });
};

var remove = function (req, res) {
    var id = req.params.id;
    lessonModel.findByIdAndRemove(id, function (err, lesson) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the lesson.',
                error: err
            });
        }
        return res.status(204).json();
    });
};

module.exports = {
    list: list,
    show: show,
    create: create,
    update: update,
    remove: remove
};