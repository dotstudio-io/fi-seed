/*global angular */

(function () {
    'use strict';

    var open = ['/', '/help', '/recover', '/signup'],
        auth = angular.module('Auth', []);

    auth.run(function ($rootScope, $location, $session) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            //            if ($session.user()) {
            //                console.log("User is logged in!");
            //            } else {
            //                console.log("User has not logged in!");
            //
            //                /* Redirect to login if not authorized */
            //                if (open.indexOf(next) < 0) {
            //                    $location.path('/');
            //                }
            //            }

        });

    });

}());
