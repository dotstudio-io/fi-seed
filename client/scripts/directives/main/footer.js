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
   */
  function mainFooterDirectiveFn() {
    return mainFooterDirectiveDef;
  }

  /* Define AngularJS directive */
  ng.module('App').directive('mainFooter', mainFooterDirectiveFn);

}(window));
