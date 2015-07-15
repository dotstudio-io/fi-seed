(function (ng) {
  'use strict';

  ng.module('App').controller('Users:Recover', [
    '$scope', '$http', '$location', '$session',

    function ($scope, $http, $location, $session) {
      $scope.submitting = false;

      $scope.submit = function () {
        $scope.submitting = true;

        $http.post('/api/users/recover', {
          email: $scope.form.email
        }).

        success(function () {
          $location.path('/');
          $session.flash('success',
            "Please check your email inbox. Dont forget to check the SPAM folder just in case.");
        }).

        error(function () {
          $session.flash('danger', 'Invalid Email! ... or something...');
        }).

        finally(function () {
          $scope.submitting = false;
        });
      };
    }
  ]);

}(angular));
