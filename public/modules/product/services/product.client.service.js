//Articles service used for communicating with the articles REST endpoints
angular.module('product').factory('Products', ['$resource', function($resource) {

    // rest product api
    var api = $resource('api/products:page:limit/:productId', {
        page: '@page',
        limit: '@limit',
        productId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    // filter for invoice
    var filter = $resource('api/products/state/:filterState', {
        filterState: '@filterState'
    });

    // search products
    var search = $resource('api/products/search:productCode/:productName', {
        productCode: '@productCode',
        productName: '@productName'
    });

    return {
        api: api,
        filter: filter,
        search: search
    };
}
]);