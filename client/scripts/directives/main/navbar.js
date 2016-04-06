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
    '$location', '$http', '$session', 'APP_NAME',

    function ($location, $http, $session, APP_NAME) {

      return {
        templateUrl: '/assets/templates/main/navbar.html',

        restrict: 'E',

        scope: {},

        link: function ($scope) {
          var lastScrollTop = 0;
          var minDiff = 60;
          var minTop = 60;

          var $collapse = ng.element(document.querySelector('.navbar-collapse'));

          $scope.location = $location.path();
          $scope.APP_NAME = APP_NAME;
          $scope.signingIn = false;
          $scope.folded = false;

          /**
           * Sets the folding state of the navbar.
           */
          function setFolding(folded) {
            $scope.$apply(function () {
              $scope.folded = folded;
            });
          }

          $scope.toggleCollapse = function () {
            if ($collapse.hasClass('collapse')) {
              $collapse.removeClass('collapse');
            } else {
              $collapse.addClass('collapse');
            }
          };

          /**
           * Detect scroll changes and set navbar style accordingly.
           */
          window.addEventListener('scroll', function () {
            var scrollTop = this.pageYOffset;

            /* Calculate only if scroll top is more than "minTop" units */
            if (scrollTop > minTop) {
              /* Wait for a minimum difference of "minDiff" units */
              if (Math.abs(scrollTop - lastScrollTop) > minDiff) {
                if (scrollTop < lastScrollTop) {
                  if ($scope.folded) {
                    setFolding(false);
                  }
                } else if (!$scope.folded) {
                  setFolding(true);
                }

                lastScrollTop = scrollTop;
              }
            } else if ($scope.folded) {
              setFolding(false);
            }
          }, false);

          /**
           * Sign the user out.
           */
          $scope.signout = function () {
            $http.get('/api/users/sign-out').then(function success() {
              $session.flash('success', "¡It's been a pleasure!", "Come back soon!");
              $session.signout();
              $location.path('/');
            }, function error() {
              $session.flash('danger', "Hmmmmm,", "Someone doesn't want you to leave...");
            });
          };

          /* Collapse the navbar menu when route changes */
          /* Clear the scope's location variable */
          $scope.$on('$routeChangeStart', function () {
            $collapse.addClass('collapse');
            $scope.location = "";
          });

          /* Update the scope's location */
          $scope.$on('$routeChangeSuccess', function () {
            $scope.location = $location.path();
          });
        }
      };
    }
  ]);

}(angular));
