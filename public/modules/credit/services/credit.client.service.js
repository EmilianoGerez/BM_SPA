//Articles service used for communicating with the articles REST endpoints
angular.module('credit').factory('Credits', ['$resource', function($resource) {
    return $resource('api/credits/:id', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}
]);