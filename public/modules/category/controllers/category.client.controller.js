angular.module('category')
    .controller('CategoryController', ['$scope', '$stateParams', '$location', 'Categories', function($scope, $stateParams, $location, Categories) {

        $scope.findAll = function() {
            $scope.categories = Categories.query();
        };

        $scope.findOne = function() {
            $scope.category = Categories.get({
                id: $stateParams.id
            });
        };

        $scope.create = function() {
            var newCategory = new Categories({
                name: this.name
            });
            newCategory.$save(function(response) {
                $location.path('categories');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.update = function() {
            $scope.category.$update(function() {
                $location.path('categories');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.remove = function(category) {
            category.$remove();
            console.log(category);
            $scope.categories = $scope.categories.filter(function(element) {
                return element._id !== category._id;
            });
        };

    }]);