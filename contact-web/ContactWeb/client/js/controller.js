/***
This file contains the controller for the main module (BNPUnicity)  providing the following:



***/

(function () {

    angular.module('bnp.unicity.controller', []).controller('MainController', MainController);

    MainController.$inject = [
        '$scope',
        '$state',
        'DataSrv',
        '$location'];


    function MainController(
        $scope,
        $state,
        DataSrv,
        $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.isActiveButton = function (viewLocation) {
            return $location.path().indexOf(viewLocation) === 0;
        };

    }

})();
