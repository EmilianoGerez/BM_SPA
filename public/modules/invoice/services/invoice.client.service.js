//Articles service used for communicating with the articles REST endpoints
angular.module('invoice').factory('Invoices', ['$resource', function($resource) {
    // rest product api
    var api = $resource('api/invoices:page:limit/:id', {
        page: '@page',
        limit: '@limit',
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    // search products
    var search = $resource('api/invoices/search/:clientName', {
        clientName: '@clientName'
    });

    return {
        api: api,
        search: search
    };
}
]);