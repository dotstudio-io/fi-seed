(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Retrieves a meta's content by it's name attribute value.
   *
   * @param {String} name The meta name value to match.
   *
   * @returns {String} The matched meta's content value.
   */
  function getMetaContent(name) {
    return document.querySelector('meta[name="' + name + '"]')
      .getAttribute('content');
  }

  /* Application info */
  window.app = {
    environment: getMetaContent('environment'),
    version: getMetaContent('version'),
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
    'angular-loading-bar',
    'ngAuthorize',
    'ngSession',
    'ngFlashes'
  ];

  ng.module('App', APP_DEF);

}(window));
