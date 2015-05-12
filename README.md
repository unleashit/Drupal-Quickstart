Drupal Starter
============

Simple Drupal starter with useful modules, bootstrap, npm, bower and some helpful grunt tasks.

##Installation

**Step 1**

Clone the repo, then run:

```drush make basicdrupal.make .```

Note this will install drupal in the root directory. Change the dot to a folder or path as desired. Next create a new blank database, and install Drupal as usual. 

Alternatively, you can use drush to install:

```drush site-install standard --account-name=admin --account-pass=admin --db-url=mysql://[db_user]:[db_password]@[db_host]/[db_name]```

OR for a sqlite database:

```drush site-install standard --account-name=admin --account-pass=admin --db-url=sqlite://sites/default/files/.ht.sqlite```

**Step 2**

Once Drupal is installed, in the following order run:

npm install
bower install
grunt copy

Important: to fix a bug the bootstrap theme, run grunt copy before first run. Then open /sites/all/themes/bootstrap_subtheme/less/style.less and add @import "../bootstrap/less/variables.less"; It must be placed at the top, above bootstrap.less to avoid Less errors. Finally:

grunt firstrun

** step 3 **

To use the bootstrap theme, you must first rename bootstrap_subtheme.info.starterkit to bootstrap_subtheme.info in the bootstrap child theme. Then add scripts[] = 'js/scripts.min.js' inside it if you want to add custom js. Finally enable the theme within Drupal! 

##Included Drupal modules

Please see basicdrupal.make file

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

####Grunt firstinstall

```Use when first cloning repo. Runs Copy, Less, Concat and Uglify```

####Grunt build

```Manually compiles Less and JS```

####Grunt images

```Runs image tasks```

####Grunt

```Use during development. Turns on BrowserSync for live reloading, compiles Less as a watch task```
