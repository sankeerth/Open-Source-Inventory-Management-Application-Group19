var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

mongoose.model('Item', Item);
mongoose.model('User', User);
mongoose.model('Lesson', Lesson);
mongoose.model('Request', Request);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/inventory');