module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('bower.json'),

		meta: {
			banner: '/*\n' +
				' *	 <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
				' *	 <%= pkg.description %>\n' +
				' *	 <%= pkg.homepage %>\n' +
				' *\n' +
				' *	 Copyright (c) <%= grunt.template.today("yyyy") %>\n' +
				' *	 MIT License\n' +
				' *	 Forked from github.com/zenorocha/jquery-github-repos then github.com/ricardobeat/github-repos\n' +
				' */\n'
		},

		bump: {
			options: {
				files: ['bower.json', 'GitHubBadge.json'],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['bower.json', 'GitHubBadge.json', 'dist'],
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: '',
				push: true,
				pushTo: 'origin'
			}
		},

		config: {
			src: 'src:/*.html',
			dist: 'dist/'
		},
		'string-replace': {
			inline: {
				files: {
					'src/GitHubBadge.js': 'src/GitHubBadge.template.js'
				}
			},
			options : {
				replacements : [
					{
						pattern: '{{template}}',
						replacement: function(match, p1) {
							var template = grunt.file.read('src/template.html');
							return template.replace(/[\r\n]+/g, '\\n').replace(/"/g, '\\"');
						}
					}
				]
			}
		},

		concat: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				src: ['src/GitHubBadge.js'],
				dest: 'dist/GitHubBadge.js'
			}
		},

		lintspaces: {
			all: {
				src: [
					'*', 'src/*', 'spec/*', 'demo/*', 'assets/base.css', '!package.json'
				],
				options: {
					newline: true,
					trailingspaces: true,
					indentation: 'tabs',
					spaces: 2
				}
			}
		},

		jasmine: {
			src: 'src/GitHubBadge.js',
			options: {
				specs: 'spec/*spec.js',
				helpers: 'spec/helpers/*.js',
				vendor: 'bower_components/jquery/dist/jquery.min.js'
			}
		},

		jshint: {
			files: ['src/GitHubBadgejs'],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			my_target: {
				src: ['dist/GitHubBadge.js'],
				dest: 'dist/GitHubBadge.min.js'
			}
		},

		watch: {
			files: ['**/*'],
			tasks: ['jshint', 'string-replace', 'concat', 'uglify'],
		}

	});

	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-string-replace');

	grunt.registerTask('default', ['string-replace', 'lintspaces', 'jshint', 'concat', 'uglify']);
	grunt.registerTask('release', ['bump-only:patch', 'default', 'bump-commit']);
	grunt.registerTask('test', ['lintspaces', 'jshint', 'jasmine']);

};
