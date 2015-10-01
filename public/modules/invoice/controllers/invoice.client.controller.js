angular.module('invoice')
    .controller('InvoiceController', ['$scope', '$stateParams', '$location', '$http', 'Credits', 'Products', 'Invoices', function($scope, $stateParams, $location, $http, Credits, Products, Invoices) {

        //  PRODUCT ARRAY
        //  init array
        $scope.invoiceProducts = [];
        // add product to array
        $scope.addProduct = function(product) {
            $scope.invoiceProducts.push(product);
            $scope.productsData = $scope.productsData.filter(function(element) {
                return element._id !== product._id;
            });
        };
        // remove product in array
        $scope.removeProduct = function(product) {
            $scope.invoiceProducts = $scope.invoiceProducts.filter(function(element) {
                return element._id !== product._id;
            });
            $scope.productsData.push(product);
        };
        // SubTotal/Total Calc
        $scope.subTotal = function() {
            if ($scope.invoiceProducts === '')
                return 0;

            var subTotal = 0;
            $scope.invoiceProducts.forEach(function(element) {
                subTotal = subTotal + element.price;
            });
            return subTotal;
        };
        $scope.discount = 0;
        $scope.total = function() {
            return $scope.subTotal() - $scope.discount;
        };


        // Get all ref object data
        $scope.findSelectData = function() {
            $scope.creditsData = Credits.query();
            $scope.productsData = Products.filter.query({
                filterState: 'Available'
            });
        };

        // PAGINATION
        // Get count
        $scope.getCount = function() {
            Invoices.api.get(function(count) {
                $scope.totalItems = count.total;
                $scope.numPages = (count.total / 10);
            });
        };
        // Get range invoices
        $scope.findByPage = function(currentPage) {
            $scope.invoices = Invoices.api.query({
                page: (currentPage) ? currentPage : 1
            });
        };

        // Page change query
        $scope.pageChanged = function() {
            $scope.findByPage($scope.currentPage);
        };

        // SEARCH
        // Show search component
        $scope.showSearch = function() {
            $scope.searchActive = ($scope.searchActive) ? false : true;
        };

        // Search products
        $scope.searchInvoice = function() {
            $scope.searchResult = Invoices.search.query({
                clientName: $scope.searchName
            });
            $scope.searchName = '';
        };


        // Get one invoice
        $scope.findOne = function() {
            $scope.invoice = Invoices.get({
                id: $stateParams.id
            });
        };

        // Create new invoice
        $scope.create = function() {
            var invoice = new Invoices({
                date: this.dt,
                clientName: this.clientName,
                cash: (this.cash === 'true') ? true : false,
                credit_Obj: this.credit,
                items: $scope.invoiceProducts,
                subTotal: $scope.subTotal(),
                discount: this.discount,
                total: $scope.total()
            });
            invoice.$save(function(response) {
                $scope.invoiceProducts.forEach(function(element) {
                    $scope.updateState(element);
                });
                $location.path('invoices');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.remove = function(invoice) {
            invoice.$remove();
            $scope.invoices = $scope.invoices.filter(function(element) {
                return element._id !== invoice._id;
            });
        };

        // update products sold
        $scope.updateState = function(TargetProduct) {
            TargetProduct.state = 'Sold';
            TargetProduct.$update(function() {
                $scope.findAll();
            }, function(err) {
                $scope.errMessage = err.data;
                console.log(err.data);
            });
        };


        // Datepicker
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 7));
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        //$scope.maxDate = new Date(2020, 5, 22);

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };


    }]);
