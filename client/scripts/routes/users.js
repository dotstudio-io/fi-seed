(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Users routes configuration.
   */
  function usersRoutesConfigFn($routeProvider) {

    $routeProvider.

    when('/users/sign-up', {
      templateUrl: '/assets/templates/users/sign-up.html',
      controller: 'Users:SignUp'
    }).

    when('/users/sign-in', {
      templateUrl: '/assets/templates/users/sign-in.html',
      controller: 'Users:SignIn'
    })

    ;

  }

  /**
   * Define AngularJS configuration.
   */
  ng.module('App').config([
    '$routeProvider',

    usersRoutesConfigFn
  ]);

}(window));
