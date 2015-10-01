angular.module('main').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
        state('home', {
            url: '/',
            templateUrl: 'modules/main/views/home.client.view.html'
        });
}
]);