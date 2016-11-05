var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Item = new Schema({
    'name' : {
        type: String,
        required: true
    },
    'quantity' : {
        type: Number,
        required: true,
        min: 0
    },
    'rentCost' : {
        type: Number,
        required: true,
        min: 0
    },
    'purchaseCost' : {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('Item', Item);