var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Lesson = new Schema({
    //in days
    'duration' : {
        type: Number,
        required: true,
        Default: 1,
        min:1
    },
    'items' : [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },
        //per student
        quantity: {
            type: Number,
            required: true,
            Default: 1,
            min: 1
        }
    }]
});

module.exports = mongoose.model('Lesson', Lesson);