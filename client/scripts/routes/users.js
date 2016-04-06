(function (ng) {
  'use strict';

  ng.module('App').config([
    '$routeProvider',

    function ($routeProvider) {

      $routeProvider.

      when('/users/sign-up', {
        templateUrl: '/assets/templates/users/sign-up.html',
        controller: 'Users:SignUp',

        resolve: {
          statics: [
            '$statics',

            function ($statics) {
              return $statics.get(['roles', 'genders']);
            }
          ]
        }
      }).

      when('/users/sign-in', {
        templateUrl: '/assets/templates/users/sign-in.html',
        controller: 'Users:SignIn'
      })

      ;

    }
  ]);

}(angular));
