var mongoose = require('mongoose');
var ProductCode = mongoose.model('ProductCode');

exports.findAll = function(req, res) {
    ProductCode.find().populate('category_Obj', 'name').exec(function(err, productCodes) {
        if (err) {
            res.status(500).send(err.message);
        }

        res.status(200).jsonp(productCodes);
    });
};

exports.findById = function(req, res) {
    ProductCode.findById(req.params.id).populate('category_Obj').exec(function(err, productCode) {
        if (err) {
            res.status(500).send(err.message);
        }

        res.status(200).jsonp(productCode);
    });
};

exports.create = function(req, res) {
    var newProduct = new ProductCode(req.body);

    newProduct.save(function(err, productCode) {
        if (err) {
            res.status(500).send(err.message);
        }

        res.status(200).jsonp(productCode);
    });
};

exports.update = function(req, res) {
    ProductCode.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category_Obj: req.body.category_Obj
    }, function(err, productCode) {
        if (err) {
            res.status(500).send(err.message);
        }

        res.status(200).send();
    });
};

exports.delete = function(req, res) {
    ProductCode.remove({
        _id: req.params.id
    }, function(err, productCode) {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.status(200).jsonp(productCode);
    });
};