(function (window) {
  'use strict';

  var ng = window.angular;

  var SIGNUP_ROUTE = '/api/users';

  /**
   * User Sign Up controller function.
   */
  function usersSignUpControllerFn($scope, $http, $location, $session, $flash) {
    $scope.submitting = false;

    /**
     * Signing in is successful.
     */
    function signInSuccess(res) {
      $session.signin(res.data);
      $flash.success('Welcome!', 'Please enjoy yourself!');
      $location.path('/');
    }

    /**
     * Signing in has failed.
     */
    function signInFailed() {
      $session.info('One more thing:', 'please sign in with your credentials.');
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
        $flash.warning('Hmmm...', 'That account is already registered.');
      } else if (res.status === 400) {
        $flash.warning('Check your details,', 'your email or password are invalid.');
      } else {
        $flash.danger('¡#Dg@a&!', 'Server is angry :/');
      }

      $scope.submitting = false;
    }

    /**
     * Submit the form and attempt a sign up.
     */
    function submit() {
      $scope.submitting = true;

      $session.signout();

      $http.post(SIGNUP_ROUTE, $scope.data)
        .then(submitSuccess)
        .catch(submitFailed);
    }

    $scope.submit = submit;
  }

  ng.module('App').controller('Users:SignUp', [
    '$scope', '$http', '$location', '$session', '$flash',

    usersSignUpControllerFn
  ]);

}(window));
