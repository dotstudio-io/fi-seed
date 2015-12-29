/**
 * Main Navbar Directive.
 *
 * This directive controlls the main navbar's behaviour by detecting the scroll-top distance and
 * set it to be folded or unfolded. It also sets the current location's path to a scope variable
 * for the navigation links to detect if they're active.
 *
 * @type AngularJS Directive.
 */

(function (ng) {
  'use strict';

  ng.module('App').directive('mainNavbar', [
    '$window', '$location', '$http', '$session',

    function ($window, $location, $http, $session) {

      return {
        templateUrl: '/assets/templates/main/navbar.html',

        restrict: 'E',

        link: function ($scope, $element) {
          //   var lastScrollTop = 0;
          //   var minDiff = 60;
          //   var minTop = 60;
          //
          //   var $collapse = $element.find('#main-navbar-collapse');
          //
          //   $scope.location = $location.path();
          //   $scope.folded = false;
          //
          //   /**
          //    * Sets the folding state of the navbar.
          //    */
          //   function setFolding(folded) {
          //     $scope.$apply(function () {
          //       $scope.folded = folded;
          //     });
          //   }
          //
          //   /**
          //    * Detect scroll changes and set navbar style accordingly.
          //    */
          //   ng.element($window).on('scroll', function () {
          //     var scrollTop = $(this).scrollTop();
          //
          //     /* Calculate only if scroll top is more than "minTop" units */
          //     if (scrollTop > minTop) {
          //       /* Wait for a minimum difference of "minDiff" units */
          //       if (Math.abs(scrollTop - lastScrollTop) > minDiff) {
          //         if (scrollTop < lastScrollTop) {
          //           if ($scope.folded) {
          //             setFolding(false);
          //           }
          //         } else if (!$scope.folded) {
          //           setFolding(true);
          //         }
          //
          //         lastScrollTop = scrollTop;
          //       }
          //     } else if ($scope.folded) {
          //       setFolding(false);
          //     }
          //   });
          //
          //   /**
          //    * Sign the user out.
          //    */
          //   $scope.signout = function () {
          //     $http.get('/api/users/signout').
          //
          //     success(function () {
          //       $session.flash('success', "¡Ha sido un gusto!", "Vuelve pronto :)");
          //       $session.logout();
          //       $location.path('/');
          //     }).
          //
          //     error(function () {
          //       $session.flash('danger', "Hmmmmm...", "Alguien no quiere que te vayas.");
          //     });
          //   };
          //
          //   /* Collapse the navbar menu when route changes */
          //   /* Clear the scope's location variable */
          //   $scope.$on('$routeChangeStart', function () {
          //     $collapse.collapse('hide');
          //     $scope.location = "";
          //   });
          //
          //   /* Update the scope's location */
          //   $scope.$on('$routeChangeSuccess', function () {
          //     $scope.location = $location.path();
          //   });
        }
      };
    }
  ]);

}(angular));
