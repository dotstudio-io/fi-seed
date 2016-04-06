(function (ng) {
  'use strict';

  ng.module('App').directive('mainFlash', [
    '$timeout', '$session',

    function ($timeout, $session) {

      return {
        templateUrl: '/assets/templates/main/flash.html',

        restrict: 'E',

        link: function ($scope) {
          var timeout;

          $scope.hidden = true;

          /* This are the flash icon classes */
          /* Chage then to whatever your icon font uses */
          $scope.icons = {
            danger: 'remove-sign',
            warning: 'exclamation-sign',
            success: 'ok-sign',
            info: 'info-dign'
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
