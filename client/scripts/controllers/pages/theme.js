(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Theme controller function.
   */
  function pagesThemeControllerFn($scope, $flash) {
    $scope.$flash = $flash;
  }

  /**
   * Define AngularJS controller.
   */
  ng.module('App').controller('Pages:Theme', [
    '$scope', '$flash',

    pagesThemeControllerFn
  ]);

}(window));
