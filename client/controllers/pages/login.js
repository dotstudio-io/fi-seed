(function () {
    'use strict';

    /**
     * Pages Home Controller.
     */
    angular.module('App').controller('Pages:Login', function ($scope, $http, $location, $session) {

        $scope.error = false;
        $scope.submitting = false;

        $scope.login = function () {
            $scope.submitting = true;
            $scope.error = false;

            $http.post('/api/login', {
                email: $scope.form.email,
                password: $scope.form.password
            }).success(function (user) {
                $session.login(user);
                $location.path('/welcome');
            }).error(function () {
                $scope.error = true;
            }).finally(function () {
                $scope.submitting = false;
            });
        };

    });

}());
