(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Sign out resolve.
   */
  function usersSignOutResolveFn($location, $window, $session, $flash) {
    /**
     * Sign out succeeded.
     */
    function signOutSuccess() {
      $flash.success('USERS.SIGN_OUT.FLASHES.SUCCESS.TITLE', 'USERS.SIGN_OUT.FLASHES.SUCCESS.MESSAGE');
      $location.path('/');
    }

    /**
     * Sign out failed.
     */
    function signOutFailed() {
      $flash.danger('USERS.SIGN_OUT.FLASHES.ERROR.TITLE', 'USERS.SIGN_OUT.FLASHES.ERROR.MESSAGE');
      $window.history.back();
    }

    return $session.signOut().then(signOutSuccess, signOutFailed);
  }

  /**
   * Consts resolve function.
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

  /* Users sign out route definition */
  var usersSignOutRouteDef = {
    resolve: {
      signOut: usersSignOutResolveDef
    }
  };

  /**
   * Users routes configuration.
   */
  function usersRoutesConfigFn($routeProvider) {
    $routeProvider.when('/users/sign-up', usersSignUpRouteDef)
      .when('/users/sign-out', usersSignOutRouteDef)
      .when('/users/sign-in', usersSignInRouteDef);
  }

  /* Define AngularJS configuration */
  ng.module('App').config([
    '$routeProvider',

    usersRoutesConfigFn
  ]);

}(window));
