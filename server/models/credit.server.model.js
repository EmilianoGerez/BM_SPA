var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var creditSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    delay: {
        type: Number,
    }
});

module.exports = mongoose.model('Credit', creditSchema);