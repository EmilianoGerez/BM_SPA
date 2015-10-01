var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
});
var Counter = mongoose.model('Counter', CounterSchema);

// Initialize Collection

Counter.findById('CategoryId', function(err, counter) {
    if (err) {
        res.send(500, err.message);
    }

    if (counter === null) {
        var newCounter = new Counter({
            _id: 'CategoryId'
        });
        newCounter.save(function(err) {
            if (err) {
                res.send(500, err.message);
            }
        });
    }
});

Counter.findById('ProductCodesId', function(err, counter) {
    if (err) {
        res.send(500, err.message);
    }

    if (counter === null) {
        var newCounter = new Counter({
            _id: 'ProductCodesId'
        });
        newCounter.save(function(err) {
            if (err) {
                res.send(500, err.message);
            }
        });
    }
});

module.exports = Counter;