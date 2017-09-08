(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Sign out resolve function. Signs the user out or reloads current page
   * if failed.
   *
   * @param {Object} $location AngularJS Location service.
   * @param {Object} $window AngularJS Window service.
   * @param {Object} $session Session service.
   * @param {Object} $flash Flashes service.
   *
   * @returns {Promise} The session sign out promise.
   */
  function usersSignOutResolveFn($location, $window, $session, $flash) {
    return $session.signOut().then(function signOutSuccess() {
      $flash.success('USERS.SIGN_OUT.FLASHES.SUCCESS.TITLE', 'USERS.SIGN_OUT.FLASHES.SUCCESS.MESSAGE');
      $location.path('/users/sign-in');
    }, function signOutError() {
      $flash.danger('USERS.SIGN_OUT.FLASHES.ERROR.TITLE', 'USERS.SIGN_OUT.FLASHES.ERROR.MESSAGE');
      $window.history.back();
    });
  }

  /**
   * Consts resolve function.
   *
   * @param {Object} $consts Consts service.
   *
   * @returns {Promise} Consts HTTP promise.
   */
  function constsResolveFn($consts) {
    return $consts.get(['roles', 'genders']);
  }

  /* Sing out resolve definition */
  var usersSignOutResolveDef = [
    '$location', '$window', 'ngSession', 'ngFlashes',

    usersSignOutResolveFn
  ];

  /* Users sign up route resolve definition */
  var usersSignUpResolveDef = {
    consts: [
      '$consts',

      constsResolveFn
    ]
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

  /* Users sign out route definition */
  var usersSignOutRouteDef = {
    resolve: {
      signOut: usersSignOutResolveDef
    }
  };

  /**
   * Configures users routes.
   *
   * @param {$RouteProvider} $routeProvider AngularJS route provider.
   */
  function usersRoutesConfigFn($routeProvider) {
    $routeProvider.when('/users/sign-up', usersSignUpRouteDef)
      .when('/users/sign-out', usersSignOutRouteDef)
      .when('/users/sign-in', usersSignInRouteDef);
  }

  /* Perform AngularJS configuration */
  ng.module('App').config([
    '$routeProvider',

    usersRoutesConfigFn
  ]);

}(window));
