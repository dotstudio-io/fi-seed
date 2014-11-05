/*jslint nomen: true, browser: true, es5: true */
/*global angular, console */

(function () {
    'use strict';

    /**
     * Users Recover Controller.
     */
    angular.module('App').controller('Pages:Recover', function ($scope, $http, $location) {

        $scope.pageClass = 'users-recover';
        $scope.recoverError = false;
        $scope.submitting = false;

        $scope.submit = function (item, event) {
            $http.post('/api/recover', {
                _csrf: $scope.recoverForm.csrf,
                email: $scope.recoverForm.email
            }).success(function () {

            }).error(function () {

            });
        };
    });

}());
