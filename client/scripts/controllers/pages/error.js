(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Lost Controller.
   */
  function PagesErrorController($scope, $location) {
    $scope.err = $location.search().err;
  }

  /* Define AngularJS controller */
  ng.module('App').controller('Pages:Error', [
    '$scope', '$location',

    PagesErrorController
  ]);

}(window));
