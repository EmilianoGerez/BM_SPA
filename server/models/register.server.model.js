var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
    deposit: {
        type: Number,
        default: 0
    },
    extract: {
        type: Number,
        default: 0
    },
    comment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Register', registerSchema);