'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productCode_Obj: {
        type: Schema.ObjectId,
        ref: 'ProductCode'
    },
    category_Obj: {
        type: Schema.ObjectId,
        ref: 'Category'
    },
    cost: {
        type: Number,
        required: 'Debes ingresar el costo'
    },
    price: {
        type: Number,
        required: 'Debes ingresar el precio'
    },
    description: {
        type: String
    },
    state: {
        type: String,
        enum: ['Available', 'Sold', 'Warranty'],
        default: 'Available',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }

});

productSchema.virtual('displayCode').get(function() {
    var idToCode = this._id.toString();
    idToCode = idToCode.substr(idToCode.length - 10);

    return this.category_Obj.code + '-' + this.productCode_Obj.code + '-' + idToCode;
});

productSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Product', productSchema);

