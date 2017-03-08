(function (window) {
  'use strict';

  var ng = window.angular;
  var is = window.is;

  /**
   * Configure location provider.
   */
  function appConfigLocationFn($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  /**
   * Configure translation provider.
   */
  function appConfigTranslateFn($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      files: [{
        prefix: '/assets/locales/',
        suffix: '.json'
      }]
    });

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.preferredLanguage('en').fallbackLanguage('en');
  }

  /**
   * Configure flashes provider.
   */
  function appConfigFlashesFn(ngFlashesProvider) {
    ngFlashesProvider.configure({
      templateUrl: '/assets/templates/main/flash.html'
    });
  }

  /**
   * App run function.
   */
  function appRunFn($rootScope, $translate) {
    /* Define app object in root scope */
    $rootScope.app = window.app;

    var locale = navigator && navigator.language;

    if (is.string(locale) && locale.length) {
      /* Get only first two letters */
      locale = locale.substring(0, 2);
    }

    $translate.use(locale || 'en');
  }

  /**
   * Define AngularJS module.
   */
  ng.module('App')
    .config(['$translateProvider', appConfigTranslateFn])
    .config(['$locationProvider', appConfigLocationFn])
    .config(['ngFlashesProvider', appConfigFlashesFn])

    .run([
      '$rootScope', '$translate',

      appRunFn
    ]);

}(window));