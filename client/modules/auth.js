(function () {
    'use strict';

    var open = ['/', '/help', '/recover', '/signup'],
        auth = angular.module('Auth', []);

    auth.factory('$session', function ($rootScope) {

        $rootScope.session = {};

        return {
            login: function (user) {
                $rootScope.session.user = user;
            },

            logout: function () {
                delete $rootScope.session.user;
                delete $rootScope.session.workplace;
            },

            user: function () {
                return $rootScope.session.user;
            },

            get: function (key) {
                return $rootScope.session[key];
            },

            set: function (key, value) {
                $rootScope.session[key] = value;
            }

        };

    });

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
