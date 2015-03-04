/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').controller('Users:SignIn', [
    '$scope', '$http', '$location', '$session',

    function ($scope, $http, $location, $session) {
      $scope.error = false;
      $scope.submitting = false;

      $scope.submit = function () {
        $scope.submitting = true;
        $session.flash();

        $http.post('/api/users/signin', {
          email: $scope.form.email,
          password: $scope.form.password

        }).success(function (user) {
          $session.login(user);
          $location.path('/dashboard');
          $session.flash('success', 'Welcome back ' + user.name + '!');

        }).error(function () {
          $session.flash('danger', 'Wrong email or password');

        }).finally(function () {
          $scope.submitting = false;
        });

      };
    }
  ]);

}(angular));
