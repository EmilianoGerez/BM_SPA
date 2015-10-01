//Articles service used for communicating with the articles REST endpoints
angular.module('category').factory('Categories', ['$resource', function($resource) {
    return $resource('api/categories/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}
]);