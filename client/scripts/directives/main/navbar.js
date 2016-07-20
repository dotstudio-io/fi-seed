(function (window) {
  'use strict';

  var ng = window.angular;

  var SIGNOUT_ROUTE = '/api/users/sign-out';

  /**
   * Main navbar directive function.
   */
  function mainNavbarDirectiveFn($location, $http, $session, $timeout, $flash) {

    return {
      templateUrl: '/assets/templates/main/navbar.html',

      restrict: 'E',

      scope: {},

      link: function ($scope) {
        var lastScrollTop = 0;
        var minDiff = 60;
        var minTop = 60;

        var $collapse = ng.element(document.querySelector('.navbar-collapse'));

        /**
         * Sets the folding state of the navbar.
         */
        function setFolding(folded) {
          $scope.folded = folded;
          $timeout();
        }

        /**
         * Toggle the collapse state of the navbar.
         */
        function toggleCollapse() {
          if ($collapse.hasClass('collapse')) {
            $collapse.removeClass('collapse');
          } else {
            $collapse.addClass('collapse');
          }
        }

        /**
         * Sign out succeeded.
         */
        function signOutSuccess() {
          $flash.success('¡It\'s been a pleasure!', 'Come back soon!');
          $session.signout();
          $location.path('/');
        }

        /**
         * Sign out failed.
         */
        function signOutFailed() {
          $flash.danger('Hmmmmm,', 'Someone doesn\'t want you to leave...');
        }

        /**
         * Sign out complete.
         */
        function signOutComplete() {
          $scope.signingOut = false;
        }

        /**
         * Signs the user out.
         */
        function signout() {
          $scope.signingOut = true;

          $http.get(SIGNOUT_ROUTE)
            .then(signOutSuccess)
            .catch(signOutFailed)
            .finally(signOutComplete);
        }

        /**
         * Detect scroll changes and set navbar style accordingly.
         */
        function onScroll() {
          var scrollTop = window.pageYOffset;

          /* Calculate only if scroll top is more than 'minTop' units */
          if (scrollTop > minTop) {
            /* Wait for a minimum difference of 'minDiff' units */
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
        }

        /**
         * On route change start listener callback.
         */
        function onRouteChangeStart() {
          $collapse.addClass('collapse'); // Collapse the navbar menu when route changes
          $scope.location = ''; // Clear the scope's location variable
        }

        /**
         * On route change success listener callback.
         */
        function onRouteChangeSuccess() {
          $scope.location = $location.path(); // Update the scope's location
        }

        window.addEventListener('scroll', onScroll, false);

        $scope.$on('$routeChangeSuccess', onRouteChangeSuccess);
        $scope.$on('$routeChangeStart', onRouteChangeStart);

        $scope.toggleCollapse = toggleCollapse;
        $scope.location = $location.path();
        $scope.signingOut = false;
        $scope.signout = signout;
        $scope.signingIn = false;
        $scope.folded = false;
      }
    };
  }

  ng.module('App').directive('mainNavbar', [
    '$location', '$http', '$session', '$timeout', '$flash',

    mainNavbarDirectiveFn
  ]);

}(window));
