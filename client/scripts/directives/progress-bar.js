(function (ng) {
  'use strict';

  ng.module('App').directive('progressBar', [

    function () {

      return {
        restrict: 'C',

        link: function ($scope, $element, $attrs) {
          $element.css({
            width: $attrs.ariaValuenow + '%'
          });
        }
      };

    }

  ]);

}(angular));
