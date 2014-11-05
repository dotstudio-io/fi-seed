(function () {
    'use strict';

    /**
     * Users Profile Controller.
     */
    angular.module('App').controller('Pages:Welcome', function ($scope, $http, $location, $session) {

        $scope.workplaces = [];
        $scope.adding = false;
        $scope.setting = false;

        $http.get('/api/workplaces/own').success(function (data) {
            $scope.workplaces = data;
        });

        $scope.addWorkplace = function () {
            $scope.adding = true;

            $http.post('/api/workplaces', {
                name: $scope.addWorkplaceForm.name
            }).success(function (data) {
                $scope.addWorkplaceForm.name = null;
                $scope.workplaces.push(data);

            }).finally(function () {
                $scope.adding = false;
            });
        };

        $scope.setWorkplace = function (workplace) {
            $scope.setting = true;

            $session.set('workplace', workplace);

            $http.post('/api/workplaces/set/' + workplace._id).success(function () {
                $location.path('/worktable/ongoing');
            }).finally(function () {
                $scope.setting = false;
            });
        };

    });

}());
