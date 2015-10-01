angular.module('credit')
    .controller('CreditController', ['$scope', '$stateParams', '$location', 'Credits', function($scope, $stateParams, $location, Credits) {


        // Get all credits
        $scope.findAll = function() {
            $scope.credits = Credits.query();
        };

        // Get one credit
        $scope.findOne = function() {
            $scope.credit = Credits.get({
                id: $stateParams.id
            });
        };

        // Create new credit
        $scope.create = function() {
            var credit = new Credits({
                name: this.name,
                delay: this.delay
            });
            credit.$save(function(response) {
                $location.path('credits');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.update = function() {
            $scope.credit.$update(function() {
                $location.path('credits');
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

        $scope.remove = function(credit) {
            credit.$remove();
            $scope.credits = $scope.credits.filter(function(element) {
                return element._id !== credit._id;
            });
        };

    }]);
