(function (ng) {
  'use strict';

  ng.module('App').controller('Users:SignUp', [
    '$scope', '$http', '$location', '$session', 'statics',

    function ($scope, $http, $location, $session, statics) {
      $scope.statics = statics.data;
      $scope.submitting = false;

      $scope.submit = function () {
        $scope.submitting = true;
        $session.signout();
        $session.flash();

        $http.post('/api/users', $scope.data).then(function () {
          return $http.post('/api/users/sign-in', $scope.data).then(function (res) {
            $session.signin(res.data);
            $session.flash('success', "Welcome!", "Please enjoy yourself!");
            $location.path('/');
          });
        }).catch(function (res) {
          if (res.status === 409) {
            $session.flash('warning', "Hmmm...", "That account is already registered.");
          } else if (res.status === 400) {
            $session.flash('warning', "Check your details,", "your email or password are invalid.");
          } else {
            $session.flash('danger', "¡#Dg@a&!", "Server is angry :/");
          }
        }).finally(function () {
          $scope.submitting = false;
        });
      };
    }

  ]);

}(angular));
