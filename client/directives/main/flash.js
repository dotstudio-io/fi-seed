(function (ng) {
  'use strict';

  ng.module('App').directive('mainFlash', [
    '$timeout', '$session',

    function ($timeout, $session) {

      return {
        restrict: 'E',
        templateUrl: '/assets/templates/main/flash.html',
        link: function ($scope) {
          var timeout;

          $scope.hidden = true;
          $scope.icons = {
            danger: 'exclamation-triangle',
            warning: 'exclamation-circle',
            success: 'check-circle',
            info: 'info-circle'
          };

          $scope.$watch(function () {
            return $session.get('flash');
          }, function () {
            $timeout.cancel(timeout);

            if ($session.get('flash')) {
              $scope.hidden = false;

              timeout = $timeout(function () {
                $scope.hidden = true;
              }, 10000);
            } else {
              $scope.hidden = true;
            }
          });

          $scope.dismiss = function () {
            $timeout.cancel(timeout);
            $scope.hidden = true;
          };
        }
      };

    }

  ]);

}(angular));
