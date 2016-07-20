(function (window) {
  'use strict';

  var ng = window.angular;

  /* Flashes template url */
  var TEMPLATE_URL = '/assets/templates/main/flash.html';

  /* Time to automatically dismiss a flash message */
  var DISMISS_DELAY = 5000;

  /* Directive restriction */
  var RESTRICT = 'E';

  /* Flash types */
  var SUCCESS = 'success';
  var WARNING = 'warning';
  var DANGER = 'danger';
  var INFO = 'info';
  var NONE = '';

  /* Events */
  var EVENT_FLASH_SHOW = '$flash.show';

  /* Change this icon classes to whatever your icon font uses */
  var ICONS = {
    warning: 'exclamation-sign',
    danger: 'remove-sign',
    success: 'ok-sign',
    info: 'info-sign'
  };

  /**
   * Flash directive function.
   */
  function flashDirectiveFn($timeout) {
    return {
      templateUrl: TEMPLATE_URL,

      restrict: RESTRICT,

      scope: {},

      link: function flashDirectiveLinkFn($scope) {
        /**
         * Dismisses any active flash.
         *
         * @param {Number} idx The flash index to dismiss.
         */
        function dismiss(idx) {
          var flash = $scope.list[idx];

          if (flash) {
            $timeout.cancel(flash.timeout);
            $scope.list.splice(idx, 1);
          }
        }

        /**
         * Flash dismiss timeout callback.
         */
        function onDismiss() {
          dismiss($scope.list.indexOf(this));
        }

        /**
         * Watched value changed.
         */
        function onFlashShow($event, flash) {
          if ($scope.list.length > 1) {
            dismiss(0);
          }

          flash.timeout = $timeout(onDismiss.bind(flash), DISMISS_DELAY);

          $scope.list.push(flash);
        }

        $scope.$on(EVENT_FLASH_SHOW, onFlashShow);

        $scope.dismiss = dismiss;
        $scope.icons = ICONS;
        $scope.list = [];
      }
    };
  }

  /**
   * Flash service function.
   */
  function flashServiceFn($rootScope) {
    /* Add a new flash message */
    function show(type, title, message) {
      $rootScope.$broadcast(EVENT_FLASH_SHOW, {
        message: message || NONE,
        title: title || NONE,
        type: type || INFO
      });
    }

    return {
      success: show.bind(null, SUCCESS),
      warning: show.bind(null, WARNING),
      danger: show.bind(null, DANGER),
      info: show.bind(null, INFO),
      show: show
    };
  }

  /**
   * Define AngularJS module.
   */
  ng.module('Flash', [])

  /* Define service */
  .factory('$flash', [
    '$rootScope', '$timeout',

    flashServiceFn
  ])

  /* Define directive */
  .directive('flash', [
    '$timeout', '$session',

    flashDirectiveFn
  ]);

}(window));
