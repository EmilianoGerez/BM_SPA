var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counter = mongoose.model('Counter');

var productCodeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: 'Name cannot be blank'
    },
    code: {
        type: String,
        unique: true

    },
    category_Obj: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true
    }

});

productCodeSchema.pre('save', function(next) {
    var self = this;
    Counter.findByIdAndUpdate({
        _id: 'ProductCodesId'
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

module.exports = mongoose.model('ProductCode', productCodeSchema);