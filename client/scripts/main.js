(function (window) {
  'use strict';

  var ng = window.angular;
  var is = window.is;

  var ROUTE_API_SESSION = '/api/session';
  var EN = 'en';

  /**
   * App run function.
   */
  function appRunFn($rootScope, $location, $http, $session, $translate) {
    /* Define app object in root scope */
    $rootScope.app = window.app;

    var locale = navigator && navigator.language;

    if (is.string(locale) && locale.length) {
      /* Get only first two letters */
      locale = locale.substring(0, 2);
    }

    $translate.use(locale || EN);

    /**
     * Session obtained successfully.
     */
    function sessionSuccess(res) {
      if (res.status === 200) {
        $session.signin(res.data);
      }
    }

    $http.get(ROUTE_API_SESSION)
      .then(sessionSuccess);
  }

  /**
   * App config function.
   */
  function appConfigFn($locationProvider, $translateProvider) {
    $locationProvider.html5Mode(true);

    $translateProvider.useStaticFilesLoader({
      files: [{
        prefix: '/assets/locales/',
        suffix: '.json'
      }, {
        prefix: '/assets/locales/pages/',
        suffix: '.json'
      }, {
        prefix: '/assets/locales/users/',
        suffix: '.json'
      }]
    });

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.preferredLanguage(EN).fallbackLanguage(EN);
  }

  /**
   * Define AngularJS module.
   */
  ng.module('App')

  .config([
    '$locationProvider', '$translateProvider',

    appConfigFn
  ])

  .run([
    '$rootScope', '$location', '$http', '$session', '$translate',

    appRunFn
  ]);

}(window));
