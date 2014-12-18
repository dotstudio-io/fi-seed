/*jslint nomen: true, browser: true */
/*global angular, console */

(function () {
    'use strict';

    angular.module('App').filter('fromNow', function ($moment) {

        $moment.locale('es');

        return function (date) {
            return $moment(date).fromNow();
        };

    }).filter('calendar', function ($moment) {

        $moment.locale('es');

        return function (date) {
            return $moment(date).calendar();
        };

    });

}());
