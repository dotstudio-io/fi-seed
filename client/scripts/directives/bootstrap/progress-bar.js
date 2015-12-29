(function (ng) {
  'use strict';

  ng.module('App').directive('progressBar', [

    function () {

      return {
        restrict: 'C',

        scope: {},

        link: function ($scope, $element) {
          $scope.$watch(function () {
            return $element.attr('aria-valuenow');
          }, function (value) {
            /* Somehow it doesn't violates CSP policy */
            $element[0].style.width = value + '%';
          });
        }
      };

    }

  ]);

}(angular));
