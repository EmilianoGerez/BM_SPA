angular.module('category')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('listCategories', {
                url: '/categories',
                templateUrl: 'modules/category/views/list-categories.client.view.html'
            }).
            state('createCategory', {
                url: '/categories/create',
                templateUrl: 'modules/category/views/create-category.client.view.html',
            }).
            state('editCategory', {
                url: '/categories/:id/edit',
                templateUrl: 'modules/category/views/edit-category.client.view.html',
            });
    }]);