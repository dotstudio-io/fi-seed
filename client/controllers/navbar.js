/*jslint nomen: true, browser: true */
/*global angular, console */

(function () {
    'use strict';

    /**
     * Navbar Controller.
     */
    angular.module('App').controller('Navbar', function ($scope, $location, $http, $session) {

        $scope.logout = function () {
            $http.get('/api/logout').success(function () {
                $session.logout();
                $location.path('/');

            }).error(function () {});
        };

    });

}());
