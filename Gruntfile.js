module.exports = function(grunt) {

	// config paths
	var appConfig = {
		javascripts: 'app/assets/javascripts',
		stylesheets: 'app/assets/stylesheets',
		dist: {
			stylesheets: 'public/stylesheets',
			javascripts: 'public/javascripts'
		}
	};

	grunt.initConfig({
		app: 'app',
		conf: appConfig,

		// Grunt target directory would be "public" folder from Play.
		target: 'public',

		// Watch task config
		watch: {
			javascripts: {
				files: "<%= conf.javascripts %>/**/*",
				tasks: ['concat']
			},
			sass: {
				files: "<%= conf.stylesheets %>/**/*",
				tasks: ['sass'],
				options: {
					// Start a live reload server on the default port 35729
					livereload: true,
				},
			}
		},
		// SASS task config
		sass: {
			dist: {
				files: {
					// destination 			// source file
					"<%= conf.dist.stylesheets %>/style.css" : "<%= conf.stylesheets %>/style.scss"
				}
			}
		},
		// Concat task config
		concat: {   
		    dist: {
		        src: [
		            '<%= conf.javascripts %>/**/*'
		        ],
		        dest: '<%= conf.dist.javascripts %>/production.js',
		    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('dist', [
			'watch',
			'sass:dist',
			'concat'
		]);

	grunt.registerTask('default', ['dist']);
};