/*jslint node: true */
'use strict';

module.exports = function (grunt) {

    var scripts = {
        'client/assets/scripts/client.min.js': [
            'client/app.js',

            'client/filters/**/*.js',
            'client/modules/**/*.js',
            'client/services/**/*.js',
            'client/directives/**/*.js',
            'client/controllers/**/*.js',
            'client/routes/**/*.js',

            'client/main.js'
        ]
    };

    var styles = {
        'client/assets/styles/styles.min.css': 'client/styles/main.less'
    };

    var templates = [{
        expand: true,
        // flatten: false,
        cwd: 'client/templates/',
        dest: 'client/assets/templates/',
        src: ['**/*.jade', '!**/elements'],
        ext: '.html'
    }];

    grunt.initConfig({

        uglify: {
            development: {
                options: {
                    mangle: false,
                    beautify: true
                },

                files: scripts
            },

            production: {
                options: {
                    mangle: false,
                    compress: {
                        drop_console: true
                    }
                },

                files: scripts
            },
        },

        less: {
            development: {
                options: {
                    paths: ['client/styles'],
                    compress: false,
                    ieCompat: false
                },

                files: styles
            },

            production: {
                options: {
                    paths: ['client/styles'],
                    cleancss: true,
                    ieCompat: false
                },

                files: styles
            }
        },

        jade: {
            development: {
                options: {
                    basedir: 'client/templates',
                    data: {
                        debug: true
                    }
                },

                files: templates
            },

            production: {
                options: {
                    basedir: 'client/templates',
                    data: {
                        debug: false
                    }
                },

                files: templates
            }
        },

        watch: {
            options: {
                spawn: false
            },

            styles: {
                files: 'client/styles/**/*.less',
                tasks: 'less:development'
            },

            scripts: {
                files: ['client/**/*.js', '!client/components/**/*.js'],
                tasks: 'uglify:development'
            },

            templates: {
                files: 'client/templates/**/*.jade',
                tasks: 'jade:development'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('production', ['less:production', 'uglify:production', 'jade:production']);
    grunt.registerTask('development', ['less:development', 'uglify:development', 'jade:development', 'watch']);

};
