var mongoose = require('mongoose');
var Invoice = mongoose.model('Invoice');

// Count for paginate
exports.count = function(req, res) {
Invoice.count().exec(function(err, count) {
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
Invoice.find().skip(page).limit(limit).populate('credit_Obj').populate('items').exec(function(err, invoices) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(invoices);
});
};

// search by name
exports.findByName = function(req, res) {
Invoice.find({
    'clientName': new RegExp(req.params.clientName, 'i')
}).populate('credit_Obj').populate('items').exec(function(err, products) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(products);
});
};

exports.findOne = function(req, res) {
Invoice.findById(req.params.id).populate('credit_Obj').populate('items').exec(function(err, invoice) {
    if (err)
        res.status(500).send(err.message);

    res.status(200).jsonp(invoice);
});
};

exports.create = function(req, res) {
var newInvoice = new Invoice(req.body);

newInvoice.save(function(err, invoice) {
    if (err)
        res.status(500).send(err.message);

    res.status(200).jsonp(invoice);
});
};

exports.update = function(req, res) {
Invoice.findById(req.params.id, function(err, invoice) {
    if (err)
        res.status(500).send(err.message);

    invoice = req.body;

    invoice.save(function(err, invoice) {
        if (err)
            res.status(500).send(err.message);

        res.status(200).jsonp(invoice);
    });
});
};

exports.delete = function(req, res) {
Invoice.remove({
    _id: req.params.id
}, function(err) {
    if (err)
        res.status(500).send(err.message);
    res.status(200).send();
});
};