angular.module('credit').config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('listCredits', {
        url: '/credits',
        templateUrl: 'modules/credit/views/list-credits.client.view.html',
    }).state('createCredit', {
        url: '/credits/create',
        templateUrl: 'modules/credit/views/create-credit.client.view.html',
    }).state('editCredit', {
        url: '/credits/:id/edit',
        templateUrl: 'modules/credit/views/edit-credit.client.view.html',
    });
}
]);