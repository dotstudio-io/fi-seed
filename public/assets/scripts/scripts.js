/*global $ */

(function () {
    'use strict';

    $('.navbar').click('a', function () {
        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
}());