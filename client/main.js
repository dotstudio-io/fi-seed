(function (ng) {
  'use strict';

  ng.module('App').

  config([
    '$routeProvider', '$locationProvider', '$mdThemingProvider',

    function ($routeProvider, $locationProvider, $mdThemingProvider) {
      $locationProvider.html5Mode(true);

      $mdThemingProvider.definePalette('fiSeedPalette', {
        /* Palette colors */
        '50': 'ECEFF1',
        '100': 'CFD8DC',
        '200': '90A4AE',
        '300': '90A4AE',
        '400': '78909C',
        '500': '546E7A',
        '600': '546E7A',
        '700': '455A64',
        '800': '37474F',
        '900': '263238',

        /* Accent colors */
        'A100': 'DCEDC8',
        'A200': '689F38',
        'A400': '689F38',
        'A700': '689F38',

        /* Whether, by default, text (contrast) on this palette should be dark or light */
        'contrastDefaultColor': 'light',

        /* Hues which contrast should be 'dark' by default */
        'contrastDarkColors': [
          '50', '100',
          '200', '300', '400', 'A100'
        ],

        /* Could also specify this if default was 'dark' */
        'contrastLightColors': undefined
      });

      $mdThemingProvider.theme('default').
      // primaryPalette('fiSeedPalette');

      primaryPalette('blue-grey').
      accentPalette('light-green');
    }
  ]).

  constant('APP_NAME', "Fi Seed").
  constant('YEAR', new Date().getFullYear()).
  constant('DOMAIN', 'http://presupuestafacil.com').

  run([
    '$rootScope', 'APP_NAME', 'YEAR', 'DOMAIN',

    function ($rootScope, APP_NAME, YEAR, DOMAIN) {
      /* Constants set */
      $rootScope.APP_NAME = APP_NAME;
      $rootScope.DOMAIN = DOMAIN;
      $rootScope.YEAR = YEAR;
    }
  ]);

}(angular));
