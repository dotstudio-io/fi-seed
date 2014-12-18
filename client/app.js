/*global angular */

(function () {
    'use strict';

    var app = angular.module('App', [
        /** Angular dependencies **/
        'ngRoute',
        'angularFileUpload',
        'luegg.directives',

        /** Modules */
        'Adapter',
        'Session',
        'Moment',
        'Auth'
    ]);

}());