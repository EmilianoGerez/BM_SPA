angular.module('invoice').config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('listInvoices', {
            url: '/invoices',
            views: {
                '': {
                    templateUrl: 'modules/invoice/views/list-invoice.client.view.html'
                },
                'item-container@listInvoices': {
                    templateUrl: 'modules/invoice/views/_item-container.html',
                }
            }
        }).state('createInvoice', {
        url: '/invoices/create',
        templateUrl: 'modules/invoice/views/create-invoice.client.view.html',
    }).state('viewInvoice', {
        url: '/invoices/:id',
        templateUrl: 'modules/invoice/views/view-invoice.client.view.html',
    });
}
]);