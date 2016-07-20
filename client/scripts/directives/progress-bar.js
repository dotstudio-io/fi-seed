(function (ng) {
  'use strict';

  /**
   * Progress bar directive link function.
   */
  function progressBarDirectiveLinkFn($scope, $element, $attrs) {
    $element.css({
      width: $attrs.ariaValuenow + '%'
    });
  }

  /**
   * Progress bar directive function.
   */
  function progressBarDirectiveFn() {

    return {
      restrict: 'C',

      link: progressBarDirectiveLinkFn
    };

  }

  /**
   * Define AngularJS directive.
   */
  ng.module('App').directive('progressBar', progressBarDirectiveFn);

}(angular));
