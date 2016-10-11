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

  /* Otherwise route definition */
  var otherwiseRouteDef = {
    redirectTo: '/lost'
  };

  /**
   * Pages routes configuration.
   */
  function pagesRoutesConfigFn($routeProvider) {
    $routeProvider.when('/', pagesHomeRouteDef)
      .when('/theme', pagesThemeRouteDef)
      .when('/lost', pagesLostRouteDef)
      .otherwise(otherwiseRouteDef);
  }

  /* Define AngularJS configuration */
  ng.module('App').config([
    '$routeProvider',

    pagesRoutesConfigFn
  ]);

}(window));
