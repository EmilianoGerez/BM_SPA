var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    cash: {
        type: Boolean,
        required: true
    },
    credit_Obj: {
        type: Schema.ObjectId,
        ref: 'Credit'
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Product'
    }],
    subTotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    total: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);