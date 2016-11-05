var itemModel = require('../models/itemModel.js');

var list = function(req, res){
    itemModel.find(function(err, items){
        if(err){
            return res.status(500).json({
                message: 'Error when getting item',
                error: err
            })
        }
        return res.json(items);
    })
};

var show = function (req, res) {
    var id = req.params.id;
    itemModel.findOne({_id: id}, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting item',
                error: err
            });
        }
        if (!item) {
            return res.status(404).json({
                message: 'No such item'
            });
        }
        return res.json(item);
    })
};

var create = function (req, res) {
    var item = new itemModel({
        name: req.body.name,
        quantity: req.body.quantity,
        rentCost: req.body.rentCost,
        purchaseCost: req.body.purchaseCost
    });

    item.save(function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating item',
                error: err
            });
        }
        return res.status(201).json(item);
    })
};

var update = function (req, res) {
    var id = req.params.id;
    itemModel.findOne({_id: id}, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting item',
                error: err
            });
        }
        if (!item) {
            return res.status(404).json({
                message: 'No such item'
            });
        }

        item.name = req.body.name ? req.body.name : item.name;
        item.quantity = req.body.quantity ? req.body.quantity : item.quantity;
        item.rentCost = req.body.rentCost ? req.body.rentCost : item.rentCost;
        item.purchaseCost = req.body.purchaseCost ? req.body.purchaseCost : item.purchaseCost;

        item.save(function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating item.',
                    error: err
                });
            }

            return res.json(item);
        });
    });
};

var remove = function (req, res) {
    var id = req.params.id;
    itemModel.findByIdAndRemove(id, function (err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the item.',
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