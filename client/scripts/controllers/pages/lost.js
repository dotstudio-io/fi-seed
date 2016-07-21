(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Lost controller function.
   */
  function pagesLostControllerFn($scope, $location) {
    $scope.url = $location.search().url;
  }

  /**
   * Define AngularJS controller.
   */
  ng.module('App').controller('Pages:Lost', [
    '$scope', '$location',

    pagesLostControllerFn
  ]);

}(window));
