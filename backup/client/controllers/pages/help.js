/* global angular */

(function (ng) {
  'use strict';

  ng.module('App').controller('Pages:Help', [
    '$scope', '$window',

    function ($scope, $window) {
      $scope.back = function () {
        $window.history.back();
      };
    }
  ]);

}(angular));
