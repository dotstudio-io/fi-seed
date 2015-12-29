(function (ng) {
  'use strict';

  ng.module('App').controller('Pages:Theme', [
    '$scope', '$log',

    function ($scope, $log) {
      $log.log("The theme controller has been initialized!");
    }

  ]);

}(angular));
