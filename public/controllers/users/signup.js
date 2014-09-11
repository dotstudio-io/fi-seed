/*jslint nomen: true */
/*global angular, console */

(function () {
    'use strict';

    var index = angular.module('UserSignup', []);

    index.controller('UserSignupController', function ($scope, $http, $location) {

        $scope.pageClass = 'users-login-form';

        $scope.submit = function (item, event) {
            var params, request, headers;

            console.log("Signing up...");

            params = {
                _csrf: $scope.UserSignupForm.csrf,
                name: $scope.UserSignupForm.name,
                email: $scope.UserSignupForm.email,
                password: $scope.UserSignupForm.password
            };

            request = $http.post('/api/users/signup', params);

            request.success(function (user, status, headers, config) {
                console.log(user);

                if (user.id) {
                    $location.path('/');
                }
            });

            request.error(function (data, status, headers, config) {
                console.error(data);
            });

        };

    });

}());
