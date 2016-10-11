(function (window) {
  'use strict';

  var ng = window.angular;
  var is = window.is;

  var EN = 'en';

  /**
   * App run function.
   */
  function appRunFn($rootScope, $location, $http, $translate) {
    /* Define app object in root scope */
    $rootScope.app = window.app;

    var locale = navigator && navigator.language;

    if (is.string(locale) && locale.length) {
      /* Get only first two letters */
      locale = locale.substring(0, 2);
    }

    $translate.use(locale || EN);
  }

  /**
   * App config function.
   */
  function appConfigFn($locationProvider, $translateProvider, ngFlashesProvider) {
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

    ngFlashesProvider.configure({
      templateUrl: '/assets/templates/main/flash.html'
    });
  }

  /**
   * Define AngularJS module.
   */
  ng.module('App')

  .config([
    '$locationProvider', '$translateProvider', 'ngFlashesProvider',

    appConfigFn
  ])

  .run([
    '$rootScope', '$location', '$http', '$translate',

    appRunFn
  ]);

}(window));
