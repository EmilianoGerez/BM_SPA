//Articles service used for communicating with the articles REST endpoints
angular.module('register').factory('Registers', ['$resource', function($resource) {
    // rest register api
    var api = $resource('api/registers:page:limit/:id', {
        page: '@page',
        limit: '@limit',
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    return {
        api: api
    };
}
]);