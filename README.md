Drupal Starter
============

Quick Drupal starter with useful modules, bootstrap theme, npm, bower and some helpful grunt tasks.

##Installation

####Step 1

Clone the repo, then from inside it run:

```drush make basicdrupal.make .```

Note this will install drupal in the root directory. Change the dot to a folder or path as desired, but don't forget to update the paths within gruntfile if you do. Next create a new blank database, and install Drupal as usual.

Alternatively, you can use drush to install:

```drush site-install standard --account-name=admin --account-pass=admin --db-url=mysql://[db_user]:[db_password]@[db_host]/[db_name]```

OR for a sqlite database:

```drush site-install standard --account-name=admin --account-pass=admin --db-url=sqlite://sites/default/files/.ht.sqlite```

####Step 2

Once Drupal is installed, in the following order run:

1. npm install
2. bower install
3. grunt copy

Important: DO NOT run grunt copy except after initial install because the subtheme will be overwritten and you could loose your changes! To fix a bug in the bootstrap theme, after running grunt copy, open /sites/all/themes/bootstrap_subtheme/less/style.less and add:

```@import "../bootstrap/less/variables.less";```

It must be placed at the top, above bootstrap.less to avoid Less errors. Finally:

<ol start=4><li>grunt build</li></ol>

####step 3

To use the bootstrap theme, you must first rename bootstrap_subtheme.info.starterkit to bootstrap_subtheme.info in the bootstrap child theme. Then add:

```scripts[] = 'js/scripts.min.js'```

inside it if you want to use Bootstrap js or any custom js. Finally enable the Bootstrap child theme within Drupal! Note the Bootstrap theme uses a CDN by default, so you should disable in theme settings if you want to use and customize your own sources.  

##Included Drupal modules

Please see basicdrupal.make file. Note that non-core modules will not be enabled by default.

##Available Grunt tasks

1. Sass
2. Less
3. Concat
4. Uglify
5. Autoprefixer
6. Browsersync
7. Imagemin
8. Svgmin
9. Responsive Images
10. Grunticon
11. Spritesmith
12. Copy
13. Watch

##Available Grunt commands:

####Grunt copy

```Use when first cloning repo (do not run again unless you know what you are doing). Creates Bootstrap childtheme and adds Bootstrap less sources.```

####Grunt build

```Manually compiles Less and JS```

####Grunt images

```Runs image tasks```

####Grunt

```Use during development. Turns on BrowserSync for live reloading, compiles Less as a watch task. To use live reloading, you must either place the browserSync script tag in html.tpl.php or (better) add your local server (proxy) to the gruntfile.```
