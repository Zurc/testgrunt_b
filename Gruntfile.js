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
				tasks: ['uglify']
			},
			sass: {
				files: "<%= conf.stylesheets %>/**/*",
				tasks: ['sass'],
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
		// Uglify task config
		uglify: {
			dist: {
				files: {
					'<%= conf.dist.javascripts %>/production.min.js': [
					'<%= conf.dist.javascripts %>/production.js'
					]
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

	// load the plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('dist', [
			'watch',
			'sass:dist',
			'concat',
			'uglify'
		]);

	grunt.registerTask('default', ['dist']);
};