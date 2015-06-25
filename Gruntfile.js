'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		simplemocha: {
			dev: {
				src: ['tests/*.js']
			}
		},

		jshint: {
			dev:{
				src: ['Gruntfile.js', 'routes/*.js', 'tests/*.js', 'server.js']
			},
			options: {
				jshintrc: true
			}
		},

		watch: {
			files: ['tests/*.js', 'lib/*.js', 'Gruntfile.js', 'server.js', 'routes/*.js'],
			tasks: ['jshint:dev', 'simplemocha:dev']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//register default task
	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint:dev', 'simplemocha:dev']);
};
