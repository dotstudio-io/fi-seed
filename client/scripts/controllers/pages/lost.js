(function (ng) {
  'use strict';

  ng.module('App').controller('Pages:Lost', [
    '$scope', '$location',

    function ($scope, $location) {
      $scope.path = $location.search().path;
    }

  ]);

}(angular));
