(function (ng) {
  'use strict';

  ng.module('App').directive('mainFooter', [
    '$window', '$location', '$http', '$session', '$timeout', 'APP_NAME', 'YEAR',

    function ($window, $location, $http, $session, $timeout, APP_NAME, YEAR) {

      return {
        templateUrl: '/assets/templates/main/footer.html',

        restrict: 'E',

        scope: {},

        link: function ($scope) {
          $scope.APP_NAME = APP_NAME;
          $scope.YEAR = YEAR;
        }
      };

    }

  ]);

}(angular));
