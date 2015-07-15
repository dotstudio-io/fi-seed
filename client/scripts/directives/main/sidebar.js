/**
 * Main Sidebar Directive.
 *
 * @type AngularJS Directive.
 */

(function (ng) {
  'use strict';

  ng.module('App').directive('mainSidebar', [

    function () {

      return {
        restrict: 'A',
        templateUrl: '/assets/templates/main/sidebar.html',
        link: function ($scope, $element, $attrs) {

        }
      };
    }

  ]);

}(angular));
