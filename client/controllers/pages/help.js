/*jslint nomen: true, browser: true, es5: true */
/*global angular, console */

(function () {
    'use strict';

    /**
     * Pages Help Controller.
     */
    angular.module('App').controller('Pages:Help', function ($scope, $window) {
        $scope.back = function () {
            $window.history.back();
        };
    });

}());
