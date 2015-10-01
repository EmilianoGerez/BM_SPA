var mongoose = require('mongoose');
var Register = mongoose.model('Register');

// Count for paginate
exports.count = function(req, res) {
Register.count().exec(function(err, count) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp({
        total: count
    });
});
};

// Get product range
exports.findByPage = function(req, res) {
var limit = (req.params.limit) ? req.params.limit : 10;
var page = (req.params.page) ? ((req.params.page - 1) * limit) : 0;
Register.find().skip(page).limit(limit).exec(function(err, registers) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(registers);
});
};

exports.create = function(req, res) {
var newRegister = new Register({
    deposit: req.body.deposit,
    extract: req.body.extract,
    comment: req.body.comment
});

newRegister.save(function(err, register) {
    if (err)
        res.status(500).send(err.message);

    res.status(200).jsonp(register);
});
};