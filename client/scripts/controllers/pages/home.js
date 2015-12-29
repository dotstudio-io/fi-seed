(function (ng) {
  'use strict';

  ng.module('App').controller('Pages:Home', [
    '$scope', '$log',

    function ($scope, $log) {
      $scope.year = new Date().getFullYear();

      $log.log("The home controller has been initialized!");
    }

  ]);

}(angular));
