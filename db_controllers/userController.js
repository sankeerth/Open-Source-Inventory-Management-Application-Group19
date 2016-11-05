var userModel = require('../models/userModel.js');

var list = function(req, res){
    userModel.find(function(err, users){
        console.log('found something');
        if(err){
            return res.status(500).json({
                message: 'Error when getting user',
                error: err
            })
        }
        return res.json(users);
    })
};

var show = function (req, res) {
    var id = req.params.id;
    userModel.findOne({_id: id}, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user',
                error: err
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'No such user'
            });
        }
        return res.json(user);
    })
};

var create = function (req, res) {
    var user = new userModel({
        name: req.body.name,
        quantity: req.body.quantity,
        rentCost: req.body.rentCost,
        purchaseCost: req.body.purchaseCost
    });

    user.save(function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        }
        return res.status(201).json(user);
    })
};

var update = function (req, res) {
    var id = req.params.id;
    userModel.findOne({_id: id}, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting user',
                error: err
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'No such user'
            });
        }

        user.name = req.body.name ? req.body.name : user.name;
        user.quantity = req.body.quantity ? req.body.quantity : user.quantity;
        user.rentCost = req.body.rentCost ? req.body.rentCost : user.rentCost;
        user.purchaseCost = req.body.purchaseCost ? req.body.purchaseCost : user.purchaseCost;

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating user.',
                    error: err
                });
            }

            return res.json(user);
        });
    });
};

var remove = function (req, res) {
    var id = req.params.id;
    userModel.findByIdAndRemove(id, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the user.',
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