angular.module('product_code')
    .controller('ProductCodeController', ['$scope', '$stateParams', '$location', '$http', 'ProductCodes', 'Categories', function($scope, $stateParams, $location, $http, ProductCodes, Categories) {

        // Categories data for select
        $scope.findCategories = function() {
            $scope.categoriesData = Categories.query();
        };

        $scope.findAll = function() {
            $scope.productCodes = ProductCodes.query();
        };

        $scope.findOne = function() {
            $scope.productCode = ProductCodes.get({
                id: $stateParams.id
            });
            $scope.findCategories();
        };

        $scope.create = function() {
            var newProductCode = new ProductCodes({
                name: this.name,
                category_Obj: this.category
            });
            newProductCode.$save(function(response) {
                $location.path('productCodes');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.update = function() {
            $scope.productCode.$update(function() {
                $location.path('productCodes');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.remove = function(productCode) {
            productCode.$remove();
            $scope.productCodes = $scope.productCodes.filter(function(element) {
                return element._id !== productCode._id;
            });
        };

    }]);