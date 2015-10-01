angular.module('product').config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('listProducts', {
        url: '/products',
        views: {
            '': {
                templateUrl: 'modules/product/views/list-products.client.view.html'
            },
            'item-container@listProducts': {
                templateUrl: 'modules/product/views/_item-container.html'
            }
        }
    }).state('createProduct', {
        url: '/products/create',
        templateUrl: 'modules/product/views/create-product.client.view.html',
    }).state('editProduct', {
        url: '/products/:productId/edit',
        templateUrl: 'modules/product/views/edit-product.client.view.html',
    });
}
]);