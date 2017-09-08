(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * User Sign Up Controller.
   *
   * @param {Object} $scope Controller scope.
   * @param {Function} $http AngularJS HTTP service.
   * @param {Object} $location AngularJS Location service.
   * @param {Object} $session Session service.
   * @param {Object} $flash Flashes service.
   * @param {Object} consts Consts resolved data.
   */
  function UsersSignUpController($scope, $http, $location, $session, $flash, consts) {
    /**
     * Signing In success callback.
     */
    function signInSuccess() {
      $flash.success('USERS.SIGN_UP.FLASHES.SUCCESS.TITLE', 'USERS.SIGN_UP.FLASHES.SUCCESS.MESSAGE');
      $location.path('/');
    }

    /**
     * Signing In error callback.
     */
    function signInError() {
      $flash.danger('USERS.SIGN_UP.FLASHES.ERROR.TITLE', 'USERS.SIGN_UP.FLASHES.ERROR.MESSAGE');
      $scope.submitting = false;
    }

    /**
     * Submit success callback.
     *
     * @returns {Promise} Sign In HTTP promise.
     */
    function submitSuccess() {
      return $session.signIn($scope.data)
        .then(signInSuccess, signInError);
    }

    /**
     * Submit error callback.
     *
     * @param {Object} res AngularJS HTTP response object.
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
     * Submits the form data and signs the user in.
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

  /* Declare AngularJS Controller */
  ng.module('App').controller('Users:SignUp', [
    '$scope', '$http', '$location', 'ngSession', 'ngFlashes', 'consts',

    UsersSignUpController
  ]);

}(window));
