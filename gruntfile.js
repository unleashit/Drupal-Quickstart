var bootstrap_path = 'bower_components/bootstrap/',
  bootstrap_csspath = bootstrap_path + 'less/',
  bootstrap_jspath = bootstrap_path + 'js/',
  theme_path = 'sites/all/themes/bootstrap_childtheme/';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          // copy bootstrap less
          // {expand: true, cwd: bootstrap_csspath, src: ['**'], dest: theme_path + 'bootstrap/'}
        ]
      }
    },
    concat: {
        dist: {
            src: [
               // bootstrap_jspath + '*.js', // All bootstrap JS
                bootstrap_jspath + 'transition.js',
                bootstrap_jspath + 'alert.js',
                bootstrap_jspath + 'button.js',
                bootstrap_jspath + 'carousel.js',
                bootstrap_jspath + 'collapse.js',
                bootstrap_jspath + 'dropdown.js',
                bootstrap_jspath + 'modal.js',
                bootstrap_jspath + 'tooltip.js',
                bootstrap_jspath + 'popover.js',
                bootstrap_jspath + 'scrollspy.js',
                bootstrap_jspath + 'tab.js',
                bootstrap_jspath + 'affix.js',
                theme_path + 'js/custom.js' // This specific file
            ],
            dest: theme_path + 'js/scripts.js',
        }
    },
    autoprefixer: {
        options: {
            browsers: ['last 2 version', 'ie 8', 'ie 9']
           },
             single_file: {
        options: {
          },
          src: theme_path + 'css/styles.css',
          dest: theme_path + 'css/prefixed.css'
        },
      },
    less: {
      development: {
        options: {
          paths: ["css"]
        },
        files: {
          "sites/all/themes/bootstrap_childtheme/css/style.css": "sites/all/themes/bootstrap_childtheme/less/style.less"
        }
      }
      // production: {
      //   options: {
      //     paths: ["css"],
      //     cleancss: false,
      //     modifyVars: {
      //       imgPath: '"http://mycdn.com/path/to/images"',
      //       bgColor: 'red'
      //     }
      //   },
      //   files: {
      //     "css/style.css": "less/style.less"
      //   }
      // }
    },
    sass: {
      dist: {
        options: {
          compass: false,
          sourcemap: 'true'
        },
        files: {
          'css/styles.css': 'scss/styles.scss'
        }
      }
    },
    uglify: {
        build: {
            src: theme_path + 'js/scripts.js',
            dest: theme_path + 'js/scripts.min.js'
        }
    },
  responsive_images: {
    myTask: {
        options: {
          engine: 'im',
          sizes: [{
          name: 'small',
          width: "25%",
          quality: 80
        },{
          name: "medium",
          width: "65%",
          quality: 65
        },{
          name: "large",
          width: "100%",
          quality: 60
        }]
      },
      files: [{
        expand: true,
          cwd: theme_path + 'images/source',
          src: ['**/*.{png,jpg,gif}'],
          custom_dest: theme_path + 'images/resized/{%= name %}/'
      }]
    }
  },
    imagemin: {
        dynamic: {
            options: {
                optimizationLevel: 4,
            },
            files: [{
                expand: true,
                cwd: theme_path + 'images/source',
                src: ['**/*.{png,jpg,gif}'],
                dest: theme_path + 'images/'
            }]
        }
    },
     svgmin: { //minimize SVG files
            options: {
                plugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false }
                ]
            },
            dist: {
                expand: true,
                cwd: theme_path + 'images/svg/source',
                src: ['*.svg'],
                dest: theme_path + 'images/svg/compressed',
                ext: '.colors-light-danger-success.svg'
            }
        },
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: theme_path + 'images/svg/compressed',
                    src: ['*.svg', '*.png'],
                    dest: theme_path + "css"
                }],
                options: {
                  cssprefix: '.icon-',
                  colors: {
                  light: '#ccc',
                  danger: '#ed3921',
                  success: '#8DC63F'
                 }
              }
            }
        },
    watch: {
        scripts: {
            files: [theme_path + 'js/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
                spawn: false,
                livereload: true
            }
        },

        css: {
            files: [theme_path + 'less/*.less'],
            tasks: ['less'],
            options: {
            spawn: false,
            livereload: true
            }
        }
    },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                      theme_path + 'css/*.css',
                      theme_path + 'js/*.js',
                      theme_path + '*.php'
                ]},
                options: {
                    watchTask: true,
                    injectChanges: false,
                    ghostMode: {
                      clicks: false,
                      scroll: false,
                      links: false,
                      forms: false
                  }
                }
            }
        },
});

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-grunticon');

    grunt.registerTask('images', ['responsive_images', 'imagemin']);
    grunt.registerTask('icons', ['svgmin', 'grunticon']);
    grunt.registerTask('build', ['less', 'concat', 'uglify']);
    grunt.registerTask('default', ["watch"]);
};