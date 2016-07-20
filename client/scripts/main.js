(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * App run function.
   */
  function appRunFn($rootScope, $location, $http, $session) {
    /* Define app object in root scope */
    $rootScope.app = window.app;

    /**
     * Session obtained successfully.
     */
    function sessionSuccess(res) {
      if (res.status === 200) {
        $session.signin(res.data);
      }
    }

    $http.get('/api/session')
      .then(sessionSuccess);
  }

  /**
   * App config function.
   */
  function appConfigFn($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  /**
   * Define AngularJS module.
   */
  ng.module('App')

  .config([
    '$locationProvider',

    appConfigFn
  ])

  .run([
    '$rootScope', '$location', '$http', '$session',

    appRunFn
  ]);

}(window));
