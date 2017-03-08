(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * User Sign In Controller.
   */
  function UsersSingInControllerFn($scope, $http, $location, $session, $flash) {
    $scope.submitting = false;

    /**
     * Submit successful.
     */
    function submitSuccess() {
      $flash.success('USERS.SIGN_IN.FLASHES.SUCCESS.TITLE', 'USERS.SIGN_IN.FLASHES.SUCCESS.MESSAGE');

      if ($session.get('redirect')) {
        $location.path($session.get('redirect'));
        $session.set('redirect', null);
      } else {
        $location.path('/');
      }
    }

    /**
     * Submitting has failed.
     */
    function submitFailed(res) {
      if (res.status === 401) {
        $flash.warning('USERS.SIGN_IN.FLASHES.WARNING.TITLE', 'USERS.SIGN_IN.FLASHES.WARNING.MESSAGE');
      } else {
        $flash.danger('USERS.SIGN_IN.FLASHES.DANGER.TITLE', 'USERS.SIGN_IN.FLASHES.DANGER.MESSAGE');
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

      $session.signIn($scope.data)
        .then(submitSuccess, submitFailed)
        .finally(submitComplete);
    }

    $scope.submit = submit;
  }

  /* Define AngularJS controller */
  ng.module('App').controller('Users:SignIn', [
    '$scope', '$http', '$location', 'ngSession', 'ngFlashes',

    UsersSingInControllerFn
  ]);

}(window));
