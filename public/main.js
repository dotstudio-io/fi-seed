/*global angular */

(function () {
    'use strict';

    var app = angular.module('yourApp', [
        /* Dependencies */
        'ngRoute',

        /* Controllers*/
        'Sockets',
        'Home',
        'UserSignup'
    ]);

    app.config([
        '$routeProvider',
        '$locationProvider',

        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
                controller: 'HomeController',
                templateUrl: '/templates/pages/home'
            });

            $routeProvider.when('/users/signup', {
                controller: 'UserSignupController',
                templateUrl: '/templates/users/signup'
            });

            $routeProvider.otherwise({
                redirectTo: '/'
            });

            $locationProvider.html5Mode(true);
        }
    ]);

}());