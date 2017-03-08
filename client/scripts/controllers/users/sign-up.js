(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * User Sign Up controller function.
   */
  function UsersSignUpController($scope, $http, $location, $session, $flash, consts) {
    /**
     * Signing in is successful.
     */
    function signInSuccess() {
      $flash.success('USERS.SIGN_UP.FLASHES.SUCCESS.TITLE', 'USERS.SIGN_UP.FLASHES.SUCCESS.MESSAGE');
      $location.path('/');
    }

    /**
     * Signing up has failed.
     */
    function signInError() {
      $session.danger('USERS.SIGN_UP.FLASHES.ERROR.TITLE', 'USERS.SIGN_UP.FLASHES.ERROR.MESSAGE');
      $scope.submitting = false;
    }

    /**
     * Submitting is successful.
     */
    function submitSuccess() {
      return $session.signIn($scope.data)
        .then(signInSuccess, signInError);
    }

    /**
     * Submitting has failed.
     */
    function submitFailed(res) {
      if (res.status === 409) {
        $flash.warning('USERS.SIGN_UP.FLASHES.DUPLICATED.TITLE', 'USERS.SIGN_UP.FLASHES.DUPLICATED.MESSAGE');
      } else if (res.status === 400) {
        $flash.warning('USERS.SIGN_UP.FLASHES.WARNING.TITLE', 'USERS.SIGN_UP.FLASHES.WARNING.MESSAGE');
      } else {
        $flash.danger('USERS.SIGN_UP.FLASHES.DANGER.TITLE', 'USERS.SIGN_UP.FLASHES.DANGER.MESSAGE');
      }

      $scope.submitting = false;
    }

    /**
     * Submit the form and attempt a sign up.
     */
    function submit() {
      $scope.submitting = true;

      $http.post('/api/users', $scope.data)
        .then(submitSuccess, submitFailed);
    }

    $scope.consts = consts.data;
    $scope.submitting = false;

    $scope.submit = submit;
  }

  /* Define AngularJS controller */
  ng.module('App').controller('Users:SignUp', [
    '$scope', '$http', '$location', 'ngSession', 'ngFlashes', 'consts',

    UsersSignUpController
  ]);

}(window));
