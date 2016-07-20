(function (window) {
  'use strict';

  var ng = window.angular;

  var SIGNIN_ROUTE = '/api/users/sign-in';

  /**
   * User Sign In controller function.
   */
  function usersSingInControllerFn($scope, $http, $location, $session, $flash) {
    $scope.submitting = false;

    /**
     * Submitting is successful.
     */
    function submitSuccess(res) {
      $session.signin(res.data);
      $flash.success('Hi!', 'It\'s nice to have you back.');

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
        $flash.warning('Dammit!', 'Looks like your email or password are wrong.');
      } else {
        $flash.danger('Panic!', 'Something\'s wrong...');
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

      $http.post(SIGNIN_ROUTE, $scope.data)
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
