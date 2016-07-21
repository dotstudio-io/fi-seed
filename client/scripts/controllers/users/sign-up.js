(function (window) {
  'use strict';

  var ng = window.angular;

  var ROUTE_API_USERS_SIGN_UP = '/api/users';
  var ROUTE_API_SESSION = '/api/session';

  /**
   * User Sign Up controller function.
   */
  function usersSignUpControllerFn($scope, $http, $location, $session, $flash, consts) {
    $scope.consts = consts.data;
    $scope.submitting = false;

    /**
     * Updated session data.
     */
    function sessionSuccess(res) {
      $session.signin(res.data);
      $flash.success('USERS.SIGN-UP.FLASHES.SUCCESS.TITLE', 'USERS.SIGN-UP.FLASHES.SUCCESS.MESSAGE');
      $location.path('/');
    }

    /**
     * Signing in is successful.
     */
    function signInSuccess() {
      $http.get(ROUTE_API_SESSION)
        .then(sessionSuccess)
        .catch(signInFailed);
    }

    /**
     * Signing in has failed.
     */
    function signInFailed() {
      $session.info('USERS.SIGN-UP.FLASHES.SUCCESS.TITLE', 'USERS.SIGN-UP.FLASHES.SUCCESS.MESSAGE');
      $location.path('/users/sign-in');
    }

    /**
     * signing in is complete.
     */
    function signInComplete() {
      $scope.submitting = false;
    }

    /**
     * Submitting is successful.
     */
    function submitSuccess() {
      return $http.post('/api/users/sign-in', $scope.data)
        .then(signInSuccess)
        .catch(signInFailed)
        .finally(signInComplete);
    }

    /**
     * Submitting has failed.
     */
    function submitFailed(res) {
      if (res.status === 409) {
        $flash.warning('USERS.SIGN-UP.FLASHES.DUPLICATED.TITLE', 'USERS.SIGN-UP.FLASHES.DUPLICATED.MESSAGE');
      } else if (res.status === 400) {
        $flash.warning('USERS.SIGN-UP.FLASHES.WARNING.TITLE', 'USERS.SIGN-UP.FLASHES.WARNING.MESSAGE');
      } else {
        $flash.danger('USERS.SIGN-UP.FLASHES.DANGER.TITLE', 'USERS.SIGN-UP.FLASHES.DANGER.MESSAGE');
      }

      $scope.submitting = false;
    }

    /**
     * Submit the form and attempt a sign up.
     */
    function submit() {
      $scope.submitting = true;

      $session.signout();

      $http.post(ROUTE_API_USERS_SIGN_UP, $scope.data)
        .then(submitSuccess)
        .catch(submitFailed);
    }

    $scope.submit = submit;
  }

  ng.module('App').controller('Users:SignUp', [
    '$scope', '$http', '$location', '$session', '$flash', 'consts',

    usersSignUpControllerFn
  ]);

}(window));
