module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    karma: {

      //continuous integration mode: run tests once in PhantomJS browser.
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.registerTask('test', ['karma:continuous']);
};
