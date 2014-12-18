/* global angular */

(function () {
    'use strict';

    angular.module('App').filter('icon', function() {

        return function(body) {
            if (typeof body === 'string') {
                return 'comment';
            } else {
                return 'clipboard';
            }
        };

    });

}());
