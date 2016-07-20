(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages routes configuration.
   */
  function pagesRoutesConfigFn($routeProvider) {

    $routeProvider.

    when('/', {
      templateUrl: '/assets/templates/pages/home.html',
      controller: 'Pages:Home'
    }).

    when('/theme', {
      templateUrl: '/assets/templates/pages/theme.html',
      controller: 'Pages:Theme'
    }).

    /** Error routes */

    when('/lost', {
      templateUrl: '/assets/templates/pages/lost.html',
      controller: 'Pages:Lost'
    }).

    otherwise({
      redirectTo: '/lost'
    })

    ;

  }

  /**
   * Define AngularJS configuration.
   */
  ng.module('App').config([
    '$routeProvider',

    pagesRoutesConfigFn
  ]);

}(window));
