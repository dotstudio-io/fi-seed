/*global angular */

(function () {
    'use strict';

    var session = angular.module('Session', []);

    session.factory('$session', function ($rootScope) {

        $rootScope.session = {};

        return {
            login: function (user) {
                $rootScope.session.user = user;
            },

            logout: function () {
                $rootScope.session = {};
            },

            flash: function (message) {
                if (message) {
                    $rootScope.session.flash = message;
                } else {
                    delete $rootScope.session.flash;
                }
            },

            get: function (key) {
                return $rootScope.session[key];
            },

            set: function (key, value) {
                $rootScope.session[key] = value;
            },

            delete: function (key) {
                delete $rootScope.session[key];
            }

        };

    });

    session.run(function ($rootScope, $session) {

        /* Clear session flash messages on route change */
        $rootScope.$on('$routeChangeStart', function () {
            $session.delete('flash');
        });

    });

}());
