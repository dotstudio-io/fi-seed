(function (ng) {
  'use strict';

  ng.module('App').config([
    '$routeProvider',

    function ($routeProvider) {

      $routeProvider.

      when('/users/sign-up', {
        templateUrl: '/assets/templates/users/sign-up.html',
        controller: 'Users:SignUp'
      }).

      when('/users/sign-in', {
        templateUrl: '/assets/templates/users/sign-in.html',
        controller: 'Users:SignIn'
      }).

      when('/users/recover', {
        templateUrl: '/assets/templates/users/recover.html',
        controller: 'Users:Recover'
      })

      ;

    }
  ]);

}(angular));
