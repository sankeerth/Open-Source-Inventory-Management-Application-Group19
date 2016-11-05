var requestModel = require('../models/requestModel.js');

var list = function(req, res){
    requestModel.find(function(err, requests){
        if(err){
            return res.status(500).json({
                message: 'Error when getting request',
                error: err
            })
        }
        return res.json(requests);
    })
};

var show = function (req, res) {
    var id = req.params.id;
    requestModel.findOne({_id: id}, function (err, request) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting request',
                error: err
            });
        }
        if (!request) {
            return res.status(404).json({
                message: 'No such request'
            });
        }
        return res.json(request);
    })
};

var create = function (req, res) {
    var request = new requestModel({
        name: req.body.name,
        quantity: req.body.quantity,
        rentCost: req.body.rentCost,
        purchaseCost: req.body.purchaseCost
    });

    request.save(function (err, request) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating request',
                error: err
            });
        }
        return res.status(201).json(request);
    })
};

var update = function (req, res) {
    var id = req.params.id;
    requestModel.findOne({_id: id}, function (err, request) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting request',
                error: err
            });
        }
        if (!request) {
            return res.status(404).json({
                message: 'No such request'
            });
        }

        request.name = req.body.name ? req.body.name : request.name;
        request.quantity = req.body.quantity ? req.body.quantity : request.quantity;
        request.rentCost = req.body.rentCost ? req.body.rentCost : request.rentCost;
        request.purchaseCost = req.body.purchaseCost ? req.body.purchaseCost : request.purchaseCost;

        request.save(function (err, request) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating request.',
                    error: err
                });
            }

            return res.json(request);
        });
    });
};

var remove = function (req, res) {
    var id = req.params.id;
    requestModel.findByIdAndRemove(id, function (err, request) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the request.',
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