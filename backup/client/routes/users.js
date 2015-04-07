/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').config([
    '$routeProvider',

    function ($routeProvider) {

      $routeProvider.when('/users/signup', {
        controller: 'Users:SignUp',
        templateUrl: '/templates/users/signup.html',
        resolve: {
          statics: [
            '$statics',

            function ($statics) {
              return $statics.get('genders');
            }
          ]
        }

      }).when('/users/signin', {
        controller: 'Users:SignIn',
        templateUrl: '/templates/users/signin.html'

      }).when('/users/signout', {
        controller: 'Users:SignOut'

      }).when('/users/recover', {
        controller: 'Users:Recover',
        templateUrl: '/templates/users/recover.html'

      });

    }
  ]);

}(angular));
