(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Forbidden Controller.
   */
  function PagesForbiddenController($scope, $location) {
    $scope.err = $location.search().err;
  }

  /* Define AngularJS controller */
  ng.module('App').controller('Pages:Forbidden', [
    '$scope', '$location',

    PagesForbiddenController
  ]);

}(window));
