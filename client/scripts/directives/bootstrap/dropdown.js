(function (ng) {
  'use strict';

  var DROPDOWN_TOGGLE = 'dropdown-toggle';
  var ARIA_EXPANDED = 'aria-expanded';
  var CLICK = 'click';
  var FALSE = 'false';
  var OPEN = 'open';
  var TRUE = 'true';

  ng.module('App').directive('dropdown', [
    '$document', '$timeout',

    function ($document, $timeout) {

      return {
        restrict: 'C',

        scope: {},

        link: function ($scope, $element) {
          var $toggler;

          function onOuterClick() {
            $toggler.attr(ARIA_EXPANDED, FALSE);
            $document.off(CLICK, onOuterClick);
            $element.removeClass(OPEN);
          }

          function onTogglerClick() {
            $element.toggleClass(OPEN);

            $timeout(function () {
              if ($element.hasClass(OPEN)) {
                $toggler.attr(ARIA_EXPANDED, TRUE);
                $document.on(CLICK, onOuterClick);
              } else {
                $toggler.attr(ARIA_EXPANDED, FALSE);
                $document.off(CLICK, onOuterClick);
              }
            });
          }

          var $button = $element.find('button');
          var $a = $element.find('a');

          if ($button.hasClass(DROPDOWN_TOGGLE)) {
            $toggler = $button;
          }

          if ($a.hasClass(DROPDOWN_TOGGLE)) {
            $toggler = $a;
          }

          if ($toggler) {
            $toggler.on(CLICK, onTogglerClick);
          }
        }
      };

    }

  ]);

}(angular));
