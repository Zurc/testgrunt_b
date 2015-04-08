module.exports = function(grunt) {

	// config paths
	var appConfig = {
		stylesheets: 'app/assets/stylesheets',
		dist: {
			stylesheets: 'public/stylesheets'
		}
	};

	grunt.initConfig({
		app: 'app',
		conf: appConfig,

		// Grunt target directory would be "public" folder from Play.
		target: 'public',

		// Watch task config
		watch: {
			sass: {
				files: "<%= conf.stylesheets %>/**/*",
				tasks: ['sass']
			}
		},
		// SASS task config
		sass: {
			dist: {
				files: {
					// destination 			// source file
					"style.css" : "<%= conf.stylesheets %>/style.scss"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dist', [
			'watch',
			'sass:dist'
		]);

	grunt.registerTask('default', ['dist']);
};