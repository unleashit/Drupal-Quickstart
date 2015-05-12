var bootstrap_path = 'bower_components/bootstrap/',
  bootstrap_csspath = bootstrap_path + 'less/',
  bootstrap_jspath = bootstrap_path + 'js/',
  base_theme_path = 'sites/all/themes/'
  theme_path = base_theme_path + 'bootstrap_subtheme/',
  proxyUrl = "projects.io/sandbox/test"; //false // important: change this to your server's url or 'false' for no proxy!

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          // create child theme (copy package from bootstrap parent) 
          {expand: true, cwd: base_theme_path + 'bootstrap/bootstrap_subtheme', src: ['**'], dest: theme_path},
          // copy bootstrap less into theme
          {expand: true, cwd: bootstrap_csspath, src: ['**'], dest: theme_path + 'bootstrap/less'},
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
          src: theme_path + 'css/style.css',
          dest: theme_path + 'css/style.css'
        },
      },
    less: {
      development: {
        options: {
          paths: ["css"]
        },
        files: {
          "sites/all/themes/bootstrap_subtheme/css/style.css": "sites/all/themes/bootstrap_subtheme/less/style.less"
        }
      }
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
        // grunticon: {
        //     myIcons: {
        //         files: [{
        //             expand: true,
        //             cwd: theme_path + 'images/svg/compressed',
        //             src: ['*.svg', '*.png'],
        //             dest: theme_path + "css"
        //         }],
        //         options: {
        //           cssprefix: '.icon-',
        //           colors: {
        //           light: '#ccc',
        //           danger: '#ed3921',
        //           success: '#8DC63F'
        //          }
        //       }
        //     }
        // },
    sprite:{
      all: {
        src: theme_path + 'images/sprites/*.png',
        dest: theme_path + 'images/spritesheet.png',
        destCss: theme_path + 'less/sprites.less',
        cssVarMap: function (sprite) { sprite.name = 'icon-' + sprite.name;}
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
            spawn: false
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
                    proxy: proxyUrl,
                    watchTask: true,
                    injectChanges: true,
                    ghostMode: {
                      clicks: true,
                      scroll: false,
                      links: true,
                      forms: false
                  }
                }
            }
        },
});

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('firstrun', ['copy', 'less', 'concat', 'uglify']);

    grunt.registerTask('images', ['newer:imagemin', 'newer:svgmin', 'newer:responsive_images', 'newer:sprite']);
    grunt.registerTask('build', ['less', 'autoprefixer', 'newer:concat', 'newer:uglify']);
    grunt.registerTask('default', ["browserSync", "watch"]);
};