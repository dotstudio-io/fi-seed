(function (ng) {
  'use strict';

  ng.module('App').controller('Users:SignIn', [
    '$scope', '$http', '$location', '$session',

    function ($scope, $http, $location, $session) {
      $scope.submitting = false;

      $scope.submit = function () {
        $scope.submitting = true;
        $session.signout();
        $session.flash();

        $http.post('/api/users/sign-in', $scope.data).then(function success(res) {
          $session.signin(res.data);
          $session.flash('success', "Hi!", "It's nice to have you back.");

          if ($session.get('redirect')) {
            $location.path($session.get('redirect'));
            $session.set('redirect', null);
          } else {
            $location.path('/');
          }
        }, function error(res) {
          if (res.status === 400) {
            $session.flash('warning', "Dammit!", "Looks like your email or password are wrong.");
          } else {
            $session.flash('danger', "Panic!", "Something's wrong...");
          }
        }).then(function complete() {
          $scope.submitting = false;
        });
      };
    }

  ]);

}(angular));
