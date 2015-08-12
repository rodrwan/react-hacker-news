//  browserify ./src/app.jsx -t babelify --outfile ./build/app2.js
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    // Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      basePath: '',
      tmpPath: '.tmp/',
      srcPathCss: 'src/scss/',
      srcPathJs: 'src/app/',
      deployPath: 'build/',
      copyHtml: 'build/html/',
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '* Copyright (c) <%= grunt.template.today("yyyy") %> */'
    },

    // useminPrepare: {
    //   html: 'index.html',
    //   options: {
    //     dest: 'build'
    //   }
    // },
    // // Task configuration.
    // concat: {
    //   options: {
    //     banner: '<%= meta.banner %>'
    //   },
    //   dist: {
    //     src: [
    //       '<%= meta.srcPathJs %>init.js',
    //       '<%= meta.srcPathJs %>app.js',
    //       '<%= meta.srcPathJs %>table-topics/table-topics.js'
    //     ],
    //     dest: '.tmp/app/<%= pkg.name %>.js'
    //   }
    // },

    // sass: {
    //   dist: {
    //     files: {
    //       '.tmp/css/style.css': '<%= meta.srcPathCss %>style.scss',
    //       '.tmp/css/reset.css': '<%= meta.srcPathCss %>reset.scss'
    //     }
    //   }
    // },

    // cssmin: {
    //   build: {
    //     files: {
    //       '.tmp/cssmin/style.min.css': '.tmp/css/style.css',
    //       '.tmp/cssmin/reset.min.css': '.tmp/css/reset.css'
    //     }
    //   }
    // },

    //  uglify: {
    //   build: {
    //     files: {
    //       '.tmp/app/<%= pkg.name %>.min.js': ['.tmp/app/<%= pkg.name %>.js']
    //     }
    //   }
    // },

    // copy: {
    //   dist: {
    //     files: [
    //       {
    //         dest: '<%= meta.copyHtml %>',
    //         src: [
    //           '**/table-topics/table-topics.html'
    //         ],
    //         cwd: '<%= meta.srcPathJs %>',
    //         expand: true
    //       },
    //       {
    //         src: 'index.html',
    //         dest: 'build/index.html'
    //       },
    //       {
    //         cwd: 'src',
    //         src: 'images/**',
    //         dest: 'build/assets/',
    //         expand: true
    //       },
    //       {
    //         src: 'sftp-config.json',
    //         dest: 'build/sftp-config.json'
    //       }
    //     ]
    //   }
    // },

    wiredep: {
      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'index.html'   // .html support...
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
    },

    // filerev: {
    //   options: {
    //     algorithm: 'md5',
    //     length: 8
    //   },
    //   js: {
    //     src: 'build/app/**/*.js'
    //   },
    //   css: {
    //     src: 'build/assets/css/**/*.css'
    //   }
    // },

    // clean: {
    //   build: {
    //     src: 'build/'
    //   },
    //   tmp: ['.tmp/']
    // },

    // usemin: {
    //   options: {
    //     assetsDirs: ['build']
    //   },
    //   html: 'build/index.html',
    //   js: 'build/app/**/*.js',
    //   css: 'build/assets/css/**/*.css'
    // },

    // watch: {
    //   scripts: {
    //     files: [
    //       '<%= meta.srcPathCss %>**/*.scss',
    //       '<%= meta.srcPathJs %>**/*.js'
    //     ],
    //     tasks: [
    //       'sass',
    //       'cssmin',
    //       'concat',
    //       'ngAnnotate',
    //       'uglify',
    //       'copy'
    //     ]
    //   }
    // }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-wiredep');
  // grunt.loadNpmTasks('grunt-ng-constant');
  // grunt.loadNpmTasks('grunt-filerev');
  // grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'wiredep'
  ]);

  grunt.registerTask('test', [
    'clean:build',
    'sass',
    'cssmin',
    'ngconstant:test',
    'concat',
    'ngAnnotate',
    'uglify',
    'filerev',
    'wiredep',
    'copy',
    'usemin'
  ]);
  // Default task.
  grunt.registerTask('default', [
    'build'
  ]);
};
