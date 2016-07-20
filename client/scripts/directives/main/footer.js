(function (window) {
  'use strict';

  var ng = window.angular;

  var mainFooterDirectiveDef = {
    templateUrl: '/assets/templates/main/footer.html',

    restrict: 'E',

    scope: {}
  };

  function mainFooterDirectiveFn() {
    return mainFooterDirectiveDef;
  }

  ng.module('App').directive('mainFooter', mainFooterDirectiveFn);

}(window));
