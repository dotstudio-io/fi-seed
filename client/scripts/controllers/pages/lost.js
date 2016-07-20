(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Lost controller function.
   */
  function pagesLostControllerFn($scope, $location) {
    $scope.path = $location.search().path;
  }

  /**
   * Define AngularJS controller.
   */
  ng.module('App').controller('Pages:Lost', [
    '$scope', '$location',

    pagesLostControllerFn
  ]);

}(window));
