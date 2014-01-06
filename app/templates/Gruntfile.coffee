matchdep = require('matchdep')

module.exports = (grunt) ->
	#Load all grunt tasks (except grunt-cli) from NPM
	matchdep.filterDev('grunt-*').filter((dep) -> dep != 'grunt-cli').forEach(grunt.loadNpmTasks)

	grunt.initConfig
		app: 'app'
		src: 'app/src'
		test: 'app/test'
		dist: 'dist' # The final distribution that will be mounted by our app
		build: 'build' # Represents the temporary build directory

		copy:
			assets:
				cwd: '<%= app %>/assets'
				src: '**/*'
				dest: '<%= build %>/assets/'
				expand: true
			build:
				cwd: '<%= src %>/'
				src: ['scripts/**/*.js', 'scripts/**/*.coffee', 'views/**/*', 'stylesheets/**/*']
				dest: '<%= build %>/'
				expand: true
			dist:
				cwd: '<%= build %>'
				src: ['stylesheets/**/*.css', 'assets/**/*', 'index.html', 'index.concat.html']
				dest: '<%= dist %>/'
				expand: true
		
		# Concat all built JS scripts into a single app distribution
		concat:
			dist:
				files:
					'<%= dist %>/scripts/app.js': [
						'<%= build %>/scripts/**/*.js'
					]

		clean:
			dist: '<%= dist %>'
			build: '<%= build %>'

		coffee:
			compile:
				options:
					bare: true
				expand: true
				flatten: false
				cwd: '<%= build %>/scripts'
				src: '**/*.coffee'
				dest: '<%= build %>/scripts/'
				ext: '.js'

		# Compile all Jade templates
		jade:
			index:
				files: [{
					src: '<%= app %>/index.jade'
					dest: '<%= build %>/index.html'
				}]
			views:
				files: [{
					expand: true
					cwd: '<%= build %>/views'
					dest: '<%= build %>/views/'
					ext: '.html'
					src: ["**/*.jade"]
				}]

		smoosher:
			build:
				files:
					'<%= build %>/index.concat.html': '<%= build %>/index.html'
		karma:
			unit:
				configFile: 'karma.conf.js'

	grunt.registerTask('build', ['clean', 'copy:assets', 'copy:build', 'coffee', 'jade:index', 'smoosher:build'])
	grunt.registerTask('dist', ['build', 'concat:dist', 'copy:dist'])
	grunt.registerTask('test', ['build', 'karma:unit'])
	grunt.registerTask('default', ['build', 'test'])
