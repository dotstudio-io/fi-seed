(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Lost Controller.
   */
  function PagesLostController($scope, $location) {
    $scope.url = $location.search().url;
  }

  /* Define AngularJS controller */
  ng.module('App').controller('Pages:Lost', [
    '$scope', '$location',

    PagesLostController
  ]);

}(window));
