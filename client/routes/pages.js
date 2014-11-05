(function () {
    'use strict';

    angular.module('App').config(function ($routeProvider) {

        $routeProvider.when('/', {
            controller: 'Pages:Home',
            templateUrl: '/templates/pages/home.html',

        }).when('/help', {
            controller: 'Pages:Help',
            templateUrl: '/templates/pages/help.html'

        }).when('/recover', {
            controller: 'Pages:Recover',
            templateUrl: '/templates/pages/recover.html'

        }).when('/signup', {
            controller: 'Pages:Signup',
            templateUrl: '/templates/pages/signup.html',
            resolve: {
                statics: function ($statics) {
                    return $statics.get('specialties');
                }
            }

        }).when('/profile', {
            controller: 'Pages:Profile',
            templateUrl: '/templates/pages/profile.html'

        }).when('/welcome', {
            controller: 'Pages:Welcome',
            templateUrl: '/templates/pages/welcome.html'

        });

    });

}());
