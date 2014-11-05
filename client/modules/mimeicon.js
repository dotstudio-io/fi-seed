/*jslint nomen: true, browser: true */
/*global angular, console */

(function () {
    'use strict';

    angular.module('App').factory('$mimeicon', function () {

        return {
            for: function (type) {
                var idx, len,
                    types = [
                        {
                            regexp: /^application\/.*?(?:zip|compressed).*?$/gi,
                            icon: 'zip-o'
                        }, {
                            regexp: /^image\/.+$/gi,
                            icon: 'image-o'
                        }, {
                            regexp: /^(?:(?:application\/(?:(?:vnd\.)?.*?(?:officedocument\.wordprocessingml|opendocument\.text|ms-?word).*?))|text\/plain)$/gi,
                            icon: 'text-o'
                        }, {
                            regexp: /^(?:application\/vnd\.(?:.*?(?:(?:officedocument|opendocument)\.spreadsheet|ms-excel).*?))$/gi,
                            icon: 'excel-o'
                        }, {
                            regexp: /^application\/pdf$/gi,
                            icon: 'pdf-o'
                        }
                    ];

                for (len = types.length, idx = 0; idx < len; idx += 1) {
                    if (types[idx].regexp.test(type)) {
                        return types[idx].icon;
                    }
                }

                return 'o';
            }
        };

    });

}());
