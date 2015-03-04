/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').controller('Users:SignUp', [
    '$scope', '$http', '$location', '$session', 'statics',

    function ($scope, $http, $location, $session, statics) {

      $scope.submitting = false;
      $scope.statics = statics;

      $scope.submit = function () {
        $scope.submitting = true;
        $session.flash();

        $http.post('/api/users', {
          name: $scope.form.name,
          email: $scope.form.email,
          gender: $scope.form.gender._id,
          password: $scope.form.password

        }).success(function (user) {
          $session.login(user);
          $location.path('/dashboard');
          $session.flash('success', 'Account created! Welcome ' + user.name + '!');

        }).error(function (data, status) {
          if (status === 409) {
            /* TODO: Mail already exists! do something! */
            $session.flash('warning', 'That email account is already registered. Do you need to recover your password?');
          } else if (status === 400) {
            /* TODO: Validation error ocurred! do something! */
            $session.flash('warning', 'You entered something invalid.');
          } else {
            /* TODO: Another error ocurred! do something! */
            $session.flash('danger', 'Emmmm... The server doen\'t seem to like you...');
          }

        }).finally(function () {
          $scope.submitting = false;

        });
      };
    }

  ]);

}(angular));
