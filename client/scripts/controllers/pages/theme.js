(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Theme Controller.
   */
  function PagesThemeController($scope, $flash) {
    $scope.$flash = $flash;
  }

  /*Define AngularJS controller */
  ng.module('App').controller('Pages:Theme', [
    '$scope', '$flash',

    PagesThemeController
  ]);

}(window));
