var mongoose = require('mongoose');
var Category = mongoose.model('Category');

exports.findAll = function(req, res) {
    Category.find(function(err, categoryes) {
        if (err) {
            res.send(500, err.message);
        }

        res.status(200).jsonp(categoryes);
    });
};

exports.findById = function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if (err) {
            res.status(500).send(err.message);
        }

        res.status(200).jsonp(category);
    });
};

exports.create = function(req, res) {
    var newProduct = new Category(req.body);

    newProduct.save(function(err, category) {
        if (err) {
            res.send(500, err.message);
        }

        res.status(200).jsonp(category);
    });
};

// Use findByIdAndUpdate, because save have conflict with pre.save (in model)
exports.update = function(req, res) {
    Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, function(err, category) {
        if (err) {
            res.status(500).send(err.message);
        }

        res.status(200).send();
    });
};

exports.delete = function(req, res) {
    Category.remove({
        _id: req.params.id
    }, function(err, category) {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.status(200).jsonp(category);
    });
};