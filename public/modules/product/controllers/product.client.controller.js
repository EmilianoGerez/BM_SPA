angular.module('product')
    .controller('ProductController', ['$scope', '$stateParams', '$location', '$window', 'Categories', 'ProductCodes', 'Products', function($scope, $stateParams, $location, $window, Categories, ProductCodes, Products) {


        // Get all productCodes
        $scope.findSelectData = function() {
            $scope.categoriesData = Categories.query();
            $scope.productCodesData = ProductCodes.query();
        };

        // Filter ProductCode when select category
        $scope.filterProductCodes = function() {
            $scope.productCodesFiltered = $scope.productCodesData.filter(function(element) {
                return element.category_Obj._id === $scope.category;
            });
        };

        // Get count
        $scope.getCount = function() {
            Products.api.get(function(count) {
                $scope.totalItems = count.total;
                $scope.numPages = (count.total / 10);
            });
        };

        // Page change query
        $scope.pageChanged = function() {
            $scope.findByPage($scope.currentPage);
        };

        // Get product range
        $scope.findByPage = function(currentPage) {
            $scope.products = Products.api.query({
                page: (currentPage) ? currentPage : 1
            });
        };

        // Show search component
        $scope.showSearch = function(currentPage) {
            $scope.searchActive = ($scope.searchActive) ? false : true;
            if (!$scope.productCodesData)
                $scope.productCodesData = ProductCodes.query();
        };

        // Search products
        $scope.searchProduct = function() {
            if ($scope.searchCode) {
                $scope.searchResult = [];
                console.log('Buscar por codigo de barra');
            } else if ($scope.searchName) {
                $scope.searchResult = Products.search.query({
                    productName: $scope.searchName
                });
            }
            $scope.searchName = '';
            $scope.searchCode = '';
        };

        // Get one product
        $scope.findOne = function() {
            $scope.product = Products.api.get({
                productId: $stateParams.productId
            });
        };

        // Create new product
        $scope.create = function() {
            var product = new Products.api({
                productCode_Obj: this.productCode,
                category_Obj: this.category,
                cost: this.cost,
                price: this.price,
                description: this.description
            });
            product.$save(function(response) {
                $location.path('products');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.update = function() {
            $scope.product.$update(function() {
                $location.path('products');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.updateState = function(TargetProduct, newState) {

            TargetProduct.state = newState;
            TargetProduct.$update(function() {
                $scope.findByPage();
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.remove = function(product) {
            var deletePrompt = $window.confirm('Estas seguro de eliminar el producto?');
            if (deletePrompt) {
                product.$remove();
                $scope.products = $scope.products.filter(function(element) {
                    return element._id !== product._id;
                });
            }
        };

    }]);
