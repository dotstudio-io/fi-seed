(function (ng) {
  'use strict';

  ng.module('App').controller('Users:SignUp', [
    '$scope', '$http', '$location', '$session',

    function ($scope, $http, $location, $session) {
      $scope.submitting = false;

      $scope.submit = function () {
        $scope.submitting = true;
        $session.logout();
        $session.flash();

        $http.post('/api/users', {
          password: $scope.data.password,
          email: $scope.data.email
        }).

        success(function (data) {
          $session.login(data.user);
          $session.flash('success', "¡Bienvenido!", "Por favor sigue los pasos para completar tu perfíl.");

          $location.path('/providers/profiles/edit/details');
        }).

        error(function (data, status) {
          if (status === 409) {
            $session.flash('warning', "Hay un problema,",
              "esa cuenta ya está registrada. Tal vez debes iniciar sesión.");
          } else if (status === 400) {
            $session.flash('warning', "Revisa tu información.", "Tu correo o clave son inválidos.");
          } else {
            $session.flash('danger', "¡#Dg@a&!", "Es servidor no responde :/");
          }
        }).

        finally(function () {
          $scope.submitting = false;
        });
      };
    }

  ]);

}(angular));
