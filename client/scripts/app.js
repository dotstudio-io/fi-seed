(function (window) {
  'use strict';

  var ng = window.angular;

  function getMetaContent(name) {
    return document.querySelector('meta[name="' + name + '"]')
      .getAttribute('content');
  }

  /* Application info */
  window.app = {
    environment: getMetaContent('environment'),
    version: getMetaContent('version'),
    stage: getMetaContent('stage'),
    title: getMetaContent('title'),
    name: getMetaContent('name')
  };

  var APP_DEF = [
    /** Angular dependencies **/
    'ngAnimate',
    'ngRoute',
    'ngAria',

    /* 3rd party modules */
    'pascalprecht.translate', // Angular translate (great module naming btw ¬¬)
    'ngSession',
    'ngFlashes'
  ];

  ng.module('App', APP_DEF);

}(window));