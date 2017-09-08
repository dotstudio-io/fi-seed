(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Progress Bar Directive function.
   *
   * @returns {Object} AngularJS Directive definition.
   */
  function progressBarDirectiveFn() {
    /**
     * Progress Bar Directive link function.
     *
     * @param {any} _$scope Directive scope (unused).
     * @param {any} $element Directive's element.
     * @param {any} $attrs Directive element attributes.
     */
    function progressBarDirectiveLinkFn(_$scope, $element, $attrs) {
      var width = parseFloat($attrs.ariaValuenow) -
        parseFloat($attrs.ariaValuemin);

      width = width * 100 / parseFloat($attrs.ariaValuemax);

      $element.css({
        width: width + '%'
      });
    }

    return {
      link: progressBarDirectiveLinkFn,
      restrict: 'C'
    };
  }

  ng.module('App').directive('progressBar', progressBarDirectiveFn);

}(window));
