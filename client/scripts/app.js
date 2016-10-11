(function (window) {
  'use strict';

  var ng = window.angular;

  var SELECTOR = 'meta[name="%s"]';
  var CONTENT = 'content';
  var REPLACE = '%s';

  function getMetaContent(name) {
    return document.querySelector(SELECTOR.replace(REPLACE, name))
      .getAttribute(CONTENT);
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
