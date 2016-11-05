var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Request = new Schema({
    'user' : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    'numberStudents' : {
        type: Number,
        required: true,
        Default: 1,
        min: 0
    },
    'lesson' : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    'cost' : {
        type: Number,
        required: true,
        Default: 0,
        min: 0
    },
    'returned' : {
        type: Boolean,
        required: true,
        Default: false
    },
    'startDate' : {
        type: Date,
        required: true
    },
    'dueDate' : {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Request', Request);