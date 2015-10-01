//Articles service used for communicating with the articles REST endpoints
angular.module('product_code').factory('ProductCodes', ['$resource', function($resource) {
    return $resource('api/productCodes/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}
]);