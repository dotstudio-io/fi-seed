/*global $ */

(function () {
    'use strict';

    /**
     * This will hide the navbar in responsive mode when a link is selected.
     */
    $('.navbar').click('a', function () {
        if ($('.navbar-collapse').hasClass('in')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
}());