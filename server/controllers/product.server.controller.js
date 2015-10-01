var mongoose = require('mongoose');
var Product = mongoose.model('Product');

// Count for paginate
exports.count = function(req, res) {
Product.count().exec(function(err, count) {
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
Product.find().skip(page).limit(limit).populate('productCode_Obj').populate('category_Obj').exec(function(err, products) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(products);
});
};

// Get one product
exports.findById = function(req, res) {
Product.findById(req.params.id).populate('productCode_Obj').populate('category_Obj').exec(function(err, product) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(product);
});
};

// Filter products by state property for create invoice
exports.findByState = function(req, res) {
Product.find({
    state: req.params.filterState
}).populate('productCode_Obj').populate('category_Obj').exec(function(err, products) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(products);
});
};

// search by name
exports.findByName = function(req, res) {
Product.find({
    productCode_Obj: req.params.productName
}).populate('productCode_Obj').populate('category_Obj').exec(function(err, products) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(products);
});
};

exports.create = function(req, res) {
var newProduct = new Product(req.body);

newProduct.save(function(err, product) {
    if (err) {
        res.status(500).send(err.message);
    }

    res.status(200).jsonp(product);
});
};

exports.update = function(req, res) {
Product.findById(req.body._id, function(err, product) {
    if (err) {
        res.status(500).send(err.message);
    }
    product.productCode_Obj = req.body.productCode || req.body.productCode_Obj;
    product.category_Obj = req.body.category || req.body.category_Obj;
    product.cost = req.body.cost;
    product.price = req.body.price;
    product.description = req.body.description;
    product.state = req.body.state;

    product.save(function(err) {
        if (err) {
            res.status(500).send(err.message);
        }

        res.status(200).jsonp(product);
    });

});
};

exports.delete = function(req, res) {
Product.remove({
    _id: req.params.id
}, function(err) {
    if (err) {
        res.status(500).send(err.message);
    }
    res.status(200).send();
});
};