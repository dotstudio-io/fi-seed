(function (window) {
  'use strict';

  var ng = window.angular;

  /* Pages Home route definition */
  var pagesHomeRouteDef = {
    templateUrl: '/assets/templates/pages/home.html',
    controller: 'Pages:Home'
  };

  /* Pages Theme route definition */
  var pagesThemeRouteDef = {
    templateUrl: '/assets/templates/pages/theme.html',
    controller: 'Pages:Theme'
  };

  /* Pages Lost route definition */
  var pagesLostRouteDef = {
    templateUrl: '/assets/templates/pages/lost.html',
    controller: 'Pages:Lost'
  };

  /* Pages Error route definition */
  var pagesErrorRouteDef = {
    templateUrl: '/assets/templates/pages/error.html',
    controller: 'Pages:Error'
  };

  /* Pages Error route definition */
  var pagesForbiddenRouteDef = {
    templateUrl: '/assets/templates/pages/forbidden.html',
    controller: 'Pages:Forbidden'
  };

  /* Otherwise route definition */
  var otherwiseRouteDef = {
    redirectTo: '/lost'
  };

  /**
   * Configures pages routes.
   *
   * @param {$RouteProvider} $routeProvider AngularJS route provider.
   */
  function pagesRoutesConfigFn($routeProvider) {
    $routeProvider.when('/', pagesHomeRouteDef)
      .when('/forbidden', pagesForbiddenRouteDef)
      .when('/error', pagesErrorRouteDef)
      .when('/theme', pagesThemeRouteDef)
      .when('/lost', pagesLostRouteDef)
      .otherwise(otherwiseRouteDef);
  }

  /* Perform AngularJS configuration */
  ng.module('App').config([
    '$routeProvider',

    pagesRoutesConfigFn
  ]);

}(window));
