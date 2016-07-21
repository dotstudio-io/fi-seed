(function (window) {
  'use strict';

  var ng = window.angular;

  var ROUTE_API_USERS_SIGN_IN = '/api/users/sign-in';
  var ROUTE_API_SESSION = '/api/session';

  /**
   * User Sign In controller function.
   */
  function usersSingInControllerFn($scope, $http, $location, $session, $flash) {
    $scope.submitting = false;

    /**
     * Session updated.
     */
    function sessionSuccess(res) {
      $session.signin(res.data);
      $flash.success('USERS.SIGN-IN.FLASHES.SUCCESS.TITLE', 'USERS.SIGN-IN.FLASHES.SUCCESS.MESSAGE');

      if ($session.get('redirect')) {
        $location.path($session.get('redirect'));
        $session.set('redirect', null);
      } else {
        $location.path('/');
      }
    }

    /**
     * Submitting is successful.
     */
    function submitSuccess() {
      $http.get(ROUTE_API_SESSION)
        .then(sessionSuccess)
        .catch(submitFailed);
    }

    /**
     * Submitting has failed.
     */
    function submitFailed(res) {
      if (res.status === 401) {
        $flash.warning('USERS.SIGN-IN.FLASHES.WARNING.TITLE', 'USERS.SIGN-IN.FLASHES.WARNING.MESSAGE');
      } else {
        $flash.danger('USERS.SIGN-IN.FLASHES.DANGER.TITLE', 'USERS.SIGN-IN.FLASHES.DANGER.MESSAGE');
      }
    }

    /**
     * Submitting is complete.
     */
    function submitComplete() {
      $scope.submitting = false;
    }

    /**
     * Submit the form and attempt a sign in.
     */
    function submit() {
      $scope.submitting = true;

      $session.signout();

      $http.post(ROUTE_API_USERS_SIGN_IN, $scope.data)
        .then(submitSuccess)
        .catch(submitFailed)
        .finally(submitComplete);
    }

    $scope.submit = submit;
  }

  ng.module('App').controller('Users:SignIn', [
    '$scope', '$http', '$location', '$session', '$flash',

    usersSingInControllerFn
  ]);

}(window));
