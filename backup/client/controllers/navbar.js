/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').controller('Navbar', [
    '$scope', '$location', '$http', '$session',

    function ($scope, $location, $http, $session) {

      $scope.signout = function () {
        $http.get('/api/users/signout').success(function () {
          $session.flash('success', 'See you soon ' + $session.user('name') + '!');
          $session.logout();
          $location.path('/');

        }).error(function () {
          /* Couldn't log the user out!!!! */
          $session.flash('danger', 'Logout failed!');
        });
      };

    }
  ]);

}(angular));
