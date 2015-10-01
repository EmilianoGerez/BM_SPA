var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');

var categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    code: {
        type: String,
        unique: true
    }
});

// Auto increment field, before save.
categorySchema.pre('save', function(next) {
    var self = this;
    Counter.findByIdAndUpdate({
        _id: 'CategoryId'
    }, {
        $inc: {
            seq: 1
        }
    }, function(error, count) {
        console.log(count);
        if (error) return next(error);
        self.code = count.seq;
        next();
    });
});

module.exports = mongoose.model('Category', categorySchema);