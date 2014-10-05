module.exports = function (grunt) {
    'use strict';

    // Load tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Show elapsed time
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n'
                + ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'
                + ' * <%= pkg.homepage %>\n'
                + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n'
                + ' */\n'
        }, // meta


        /* JS : Concat
        ==============================================================*/
        concat: {
            options: {
                banner: '<%= meta.banner %>',
                separator: ';',
            },

            script: {
                dest: 'dist/bootstrap-data-src.js',
                src: ['src/bootstrap-data-src.js'],
            }
        }, // concat


        /*  JS : Uglify
        ==============================================================*/
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                separator: ';',
            },

            dist: {
                files: {
                    'dist/bootstrap-data-src.min.js': [
                        'src/bootstrap-data-src.js'
                    ]
                }
            }
        }, // uglify


        /*  Notify
        ==============================================================*/
        notify: {
            js: {
                options: {
                    message: 'grunt-js complete',
                }
            },
            prod: {
                options: {
                    message: 'Ready for production !',
                }
            }
        }, // notify


        /*  Todo
        ==============================================================*/
        todo: {
            theme: {
                options: {
                    colophon: true,
                    file: 'TODOS.md',
                    title: 'Todos',
                    githubBoxes: false,
                    marks: [{
                        name: 'TODO',
                        pattern: /@todo/,
                        color: 'yellow',
                    }, {
                        name: 'FIX',
                        pattern: /@tofix/,
                        color: 'red',
                    }, {
                        name: 'NOTE',
                        pattern: /@note/,
                        color: 'blue',
                    }],
                    usePackage: true,
                },
                src: [
                    'src/*.js',
                ]
            }
        }, // todo


        /*  Watch
        ==============================================================*/
        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: [
                    'src/*.js',
                ],
                tasks: [
                    'concat',
                    'notify:js',
                ],
            }
        }, // watch

    });


    /*  Tasks
    ==============================================================*/
    grunt.registerTask('default', [
        'js',
        'todo',
        'notify:prod',
    ]);

    grunt.registerTask('js', [
        'uglify',
        'notify:js'
    ]);

};
