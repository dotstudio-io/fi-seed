(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Consts resolve function.
   */
  function constsResolveFn($consts) {
    return $consts.get(['roles', 'genders']);
  }

  /* Users sign up route resolve definition */
  var usersSignUpResolveDef = {
    consts: ['$consts', constsResolveFn]
  };

  /* Users sign up route definition */
  var usersSignUpRouteDef = {
    templateUrl: '/assets/templates/users/sign-up.html',
    controller: 'Users:SignUp',

    resolve: usersSignUpResolveDef
  };

  /* Users sign in route definition */
  var usersSignInRouteDef = {
    templateUrl: '/assets/templates/users/sign-in.html',
    controller: 'Users:SignIn'
  };

  /**
   * Users routes configuration.
   */
  function usersRoutesConfigFn($routeProvider) {
    $routeProvider.when('/users/sign-up', usersSignUpRouteDef)
      .when('/users/sign-in', usersSignInRouteDef);
  }

  /* Define AngularJS configuration */
  ng.module('App').config([
    '$routeProvider',

    usersRoutesConfigFn
  ]);

}(window));
