(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Users create directive function.
   */
  function usersCreateDirectiveFn($http, $flash) {
    /**
     * Users create directive link function.
     */
    function usersCreateDirectiveLinkFn($scope) {

      /* Submit success */
      function onSubmitSuccess() {
        $flash.success('USERS.CREATE.FLASHES.SUCCESS.TITLE', 'USERS.CREATE.FLASHES.SUCCESS.MESSAGE');

        if (ng.isFunction($scope.after)) {
          $scope.after();
        }
      }

      /* Submit error */
      function onSubmitError() {
        $flash.danger('USERS.CREATE.FLASHES.ERROR.TITLE', 'USERS.CREATE.FLASHES.ERROR.MESSAGE');
        $scope.submitting = false;
      }

      /* Submit */
      function submit() {
        $scope.submitting = true;

        $http.post('/api/users')
          .then(onSubmitSuccess, onSubmitError);
      }

      $scope.submitting = false;

      $scope.submit = submit;
    }

    /* Users create directive definition */
    var usersCreateDirectiveDef = {
      link: usersCreateDirectiveLinkFn,
      restrict: 'A',
      scope: {
        after: '=',
        data: '='
      }
    };

    return usersCreateDirectiveDef;
  }

  /**
   * Define AngularJS directive.
   */
  ng.module('App').directive('usersCreate', [
    '$http', 'ngFlashes',

    usersCreateDirectiveFn
  ]);

}(window));
