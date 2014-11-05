(function () {
    'use strict';

    angular.module('App').config(function ($routeProvider, $locationProvider) {

        /** Not found route **/
        $routeProvider.otherwise({
            redirectTo: '/notfound'
        }).when('/notfound', {
            templateUrl: '/templates/notfound.html'
        });

        $locationProvider.html5Mode(true);

    }).run(function ($rootScope, $location, $session, $http) {

        /* Retrieve current session */
        $http.get('/api/session').success(function (data) {
            $session.login(data.user);
            $session.set('workplace', data.workplace);

            if ($location.path() === '/') {
                $location.path('/worktable/ongoing');
            }
        });

    });

}());
