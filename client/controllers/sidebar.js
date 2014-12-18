/* global angular */

(function () {
    'use strict';

    angular.module('App').controller('Sidebar', function ($scope, $location) {

        $scope.$on('$routeChangeStart', function () {
            $scope.location = $location.path();
        });

    });

}());
