(function (ng) {
  'use strict';

  var ACTIVE = 'active';

  ng.module('App').directive('nav', [

    function () {

      return {
        restrict: 'C',

        scope: {},

        link: function ($scope, $element) {
          var li = $element.find('li');

          li.on('click', function () {
            li.removeClass(ACTIVE);
            ng.element(this).addClass(ACTIVE);
          });
        }
      };

    }

  ]);

}(angular));
