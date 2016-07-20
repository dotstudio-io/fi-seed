(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Pages Home controller function.
   */
  function pagesHomeControllerFn($scope, $log) {
    $log.log('The home controller has been initialized!');
  }

  /**
   * Define AngularJS controller.
   */
  ng.module('App').controller('Pages:Home', [
    '$scope', '$log',

    pagesHomeControllerFn
  ]);

}(window));
