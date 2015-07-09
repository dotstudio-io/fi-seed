(function (ng) {
  'use strict';

  ng.module('App').controller('Users:SignIn', [
    '$scope', '$http', '$location', '$session',

    function ($scope, $http, $location, $session) {
      $scope.submitting = false;

      $scope.submit = function () {
        $scope.submitting = true;
        $session.logout();
        $session.flash();

        $http.post('/api/users/signin', {
          password: $scope.data.password,
          email: $scope.data.email
        }).

        success(function (data) {
          $session.login(data.user);
          $session.flash('success', "¡Hola!", "Es un gusto tenerte de vuelta.");

          if ($session.get('redirect')) {
            $location.path($session.get('redirect'));
            $session.set('redirect', null);
          } else {
            $location.path('/providers/dashboard');
          }
        }).

        error(function (data, status) {
          if (status === 400) {
            $session.flash('warning', "Lo sentimos,",
              "Pero parece que tu correo o clave son inválidos. ¿Tal vez necesitas crear una cuenta?");
          } else {
            $session.flash('danger', "¡Aaaaaa!", "Algo anda mal...");
          }
        }).

        finally(function () {
          $scope.submitting = false;
        });
      };
    }

  ]);

}(angular));
