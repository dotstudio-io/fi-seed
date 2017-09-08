(function (window) {
  'use strict';

  var ng = window.angular;
  var is = window.is;

  /**
   * Authorize authorizer resolve function.
   *
   * @param {Object} $q AngularJS Q service.
   * @param {Object} $route AngularJS Route service.
   * @param {Object} $location AngularJS Location service.
   * @param {Object} $auth Auth service.
   * @param {Object} $session Session service.
   * @param {Object} $flash Flashes service.
   *
   * @returns {Promise} Authorization promise.
   */
  function ngAuthorizeAuthorizerFn($q, $route, $location, $auth, $session, $flash) {
    var deferred = $q.defer();

    $session.update().then(function () {
      return $auth.authorize($route.current.$$route, $session.user('roles'));
    }).then(function authSuccess(allowed) {
      if (allowed) {
        return deferred.resolve();
      }

      $flash.warning('SESSION.UNAUTHORIZED');
    }).catch(function authError() {
      return $session.signOut().finally(function afterSignOut() {
        $location.path('/users/sign-in');
        $flash.danger('SESSION.ERROR');
      });
    });

    return deferred.promise;
  }

  /**
   * Configures Loading Bar module.
   *
   * @param {Object} $loadingBarProvider Loading Bar provider.
   */
  function loadingBarConfigFn($loadingBarProvider) {
    $loadingBarProvider.includeSpinner = false;
  }

  /**
   * Configures Authorize module.
   *
   * @param {Object} $authorizeProvider Authorize provider.
   */
  function authorizeConfigFn($authorizeProvider) {
    $authorizeProvider.configure({
      forbiddenPath: '/forbidden',
      signInPath: '/users/sign-in',
      authorizer: [
        '$q', '$route', '$location', 'ngAuthorize', 'ngSession', 'ngFlashes',

        ngAuthorizeAuthorizerFn
      ]
    });
  }

  /**
   * Configures Location module.
   *
   * @param {Object} $locationProvider AngularJS Location provider.
   */
  function locationConfigFn($locationProvider) {
    $locationProvider.html5Mode(true);
  }

  /**
   * Configures Translation module.
   *
   * @param {Object} $translateProvider Translate provider.
   */
  function translateConfigFn($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      files: [{
        prefix: '/assets/locales/',
        suffix: '.json'
      }]
    });

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.preferredLanguage('es').fallbackLanguage('es');
  }

  /**
   * Configures Flashes module.
   *
   * @param {Object} $flashesProvider Flashes provider.
   */
  function flashesConfigFn($flashesProvider) {
    $flashesProvider.configure({
      templateUrl: '/assets/templates/main/flash.html'
    });
  }

  /**
   * Configures Animate module.
   *
   * @param {Object} $animateProvider AngularJS Animate provider.
   */
  function animateConfigFn($animateProvider) {
    $animateProvider.classNameFilter(/animate/);
  }

  /**
   * Configures HTTP module.
   *
   * @param {Object} $httpProvider AngularJS HTTP provider.
   */
  function httpConfigFn($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = 'csrf-token';
    $httpProvider.defaults.xsrfCookieName = 'CSRF';
  }

  /**
   * Bootstraps application on run.
   *
   * @param {Object} $rootScope AngularJS root scope.
   * @param {Object} $translate Translate service.
   */
  function appRunFn($rootScope, $translate) {
    /* Define app object in root scope */
    $rootScope.app = window.app;

    var locale = navigator && navigator.language;

    if (is.string(locale) && locale.length) {
      /* Get only first two letters */
      locale = locale.substring(0, 2);
    }

    $translate.use(locale);
  }

  /* Define AngularJS module */
  ng.module('App')
    .config(['cfpLoadingBarProvider', loadingBarConfigFn])
    .config(['ngAuthorizeProvider', authorizeConfigFn])
    .config(['$translateProvider', translateConfigFn])
    .config(['$locationProvider', locationConfigFn])
    .config(['ngFlashesProvider', flashesConfigFn])
    .config(['$animateProvider', animateConfigFn])
    .config(['$httpProvider', httpConfigFn])

    .run([
      '$rootScope', '$translate',

      appRunFn
    ]);

}(window));
