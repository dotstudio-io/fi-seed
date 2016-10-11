(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Home Controller.
   */
  function PagesHomeController($scope, $log) {
    $log.log('The home controller has been initialized!');
  }

  /* Define AngularJS controller */
  ng.module('App').controller('Pages:Home', [
    '$scope', '$log',

    PagesHomeController
  ]);

}(window));
