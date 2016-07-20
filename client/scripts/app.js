(function (window) {
  'use strict';

  var ng = window.angular;

  /* Application info */
  window.app = {
    environment: document.querySelector('meta[name="environment"]').getAttribute('content'),
    version: document.querySelector('meta[name="version"]').getAttribute('content'),
    stage: document.querySelector('meta[name="stage"]').getAttribute('content'),
    name: document.querySelector('meta[name="name"]').getAttribute('content')
  };

  var APP_DEF = [
    /** Angular dependencies **/
    'ngAnimate',
    'ngRoute',
    'ngAria',

    /** Custom Modules **/
    'Session',
    'Flash'
  ];

  ng.module('App', APP_DEF);

}(window));
