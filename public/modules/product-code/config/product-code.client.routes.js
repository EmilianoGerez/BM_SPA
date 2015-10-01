angular.module('product_code')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('listProductCode', {
                url: '/productCodes',
                templateUrl: 'modules/product-code/views/list-productCodes.client.view.html'
            }).
            state('createProductCode', {
                url: '/productCodes/create',
                templateUrl: 'modules/product-code/views/create-productCode.client.view.html',
            }).
            state('editProductCode', {
                url: '/productCodes/:id/edit',
                templateUrl: 'modules/product-code/views/edit-productCode.client.view.html',
            });
    }]);