/*jslint nomen: true, browser: true, es5: true */
/*global angular, console */

(function () {
    'use strict';

    /**
     * Users Profile Controller.
     */
    angular.module('App').controller('Pages:Profile', function ($scope, $http, $location, $session) {

        $scope.workplaces = [];

        $http.get('/api/workplaces/own').success(function (data) {
            $scope.workplaces = data;
        });

        $scope.addWorkplace = function () {
            $http.post('/api/workplaces', {
                name: $scope.addWorkplaceForm.name
            }).success(function (data) {
                $scope.workplaces.push(data);
                $scope.addWorkplaceForm.name = null;
            });
        };

        $scope.setWorkplace = function (workplace) {
            $session.set('workplace', workplace);
        };

    });

}());
