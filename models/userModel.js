var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = new Schema({
    'category' : {
        type: String,
        required: true,
        Default: 'admin',
        enum: ['admin', 'program', 'employee']
    },
    'budget' : {
        type: Number,
        required: true,
        min:0
    }
});

module.exports = mongoose.model('User', User);