(function (window) {
  'use strict';

  var ng = window.angular;

  /* Main footer directive definition */
  var mainFooterDirectiveDef = {
    templateUrl: '/assets/templates/main/footer.html',
    restrict: 'A',
    scope: {}
  };

  /**
   * Main footer directive function.
   *
   * @returns {Object} AngularJS Directive definition.
   */
  function mainFooterDirectiveFn() {
    return mainFooterDirectiveDef;
  }

  /* Declare AngularJS directive */
  ng.module('App').directive('mainFooter', mainFooterDirectiveFn);

}(window));
