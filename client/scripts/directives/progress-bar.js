(function (window) {
  'use strict';

  var ng = window.angular;

  var PER = '%';

  /**
   * Progress bar directive link function.
   */
  function progressBarDirectiveLinkFn($scope, $element, $attrs) {
    $element.css({
      width: $attrs.ariaValuenow + PER
    });
  }

  var progressBarDirectiveDef = {
    link: progressBarDirectiveLinkFn,
    restrict: 'C'
  };

  /**
   * Progress bar directive function.
   */
  function progressBarDirectiveFn() {
    return progressBarDirectiveDef;
  }

  /**
   * Define AngularJS directive.
   */
  ng.module('App').directive('progressBar', progressBarDirectiveFn);

}(window));
