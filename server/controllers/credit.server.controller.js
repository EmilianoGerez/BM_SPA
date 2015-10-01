var mongoose = require('mongoose');
var Credit = mongoose.model('Credit');

exports.findOne = function(req, res) {
Credit.findById(req.params.id, function(err, credit) {
    if (err)
        res.status(500).send(err.message);

    res.status(200).jsonp(credit);
});
};

exports.findAll = function(req, res) {
Credit.find(function(err, credits) {
    if (err)
        res.status(500).send(err.message);

    res.status(200).jsonp(credits);
});
};

exports.create = function(req, res) {
var newCredit = new Credit(req.body);

newCredit.save(function(err, credit) {
    if (err)
        res.status(500).send(err.message);

    res.status(200).jsonp(credit);
});
};

exports.update = function(req, res) {
Credit.findById(req.params.id, function(err, credit) {
    if (err)
        res.status(500).send(err.message);

    credit.name = req.body.name;
    credit.delay = req.body.delay;

    credit.save(function(err, credit) {
        if (err)
            res.status(500).send(err.message);

        res.status(200).jsonp(credit);
    });
});
};

exports.delete = function(req, res) {
Credit.remove({
    _id: req.params.id
}, function(err) {
    if (err)
        res.status(500).send(err.message);
    res.status(200).send();
});
};