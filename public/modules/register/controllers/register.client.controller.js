angular.module('register')
    .controller('RegisterController', ['$scope', '$stateParams', 'Registers', function($scope, $stateParams, Registers) {

        // Get count
        $scope.getCount = function() {
            Registers.api.get(function(count) {
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
            $scope.registers = Registers.api.query({
                page: (currentPage) ? currentPage : 1
            });
        };

        // Create new register
        $scope.create = function() {
            var register = new Registers({
                deposit: this.deposit,
                extract: this.extract,
                comment: this.comment
            });
            this.deposit = '';
            this.extract = '';
            this.comment = '';
            this.depositRegister.$setPristine();
            register.$save(function(response) {
                //reset form
                //success message
                $scope.sucMessage = 'Transacción exitosa';
            //agregar registro al array
            }, function(err) {
                $scope.errMessage = err.data;
            });
        };

    }]);
