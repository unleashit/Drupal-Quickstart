(function() {
// grunticon preloader
var baseurl = 'http://localhost/sandbox/drupal-starter/',
	impath =  baseurl + '/sites/all/themes/bootstrap_childtheme/css/';

window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!(!t.document.createElementNS||!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||window.opera&&-1===navigator.userAgent.indexOf("Chrome")),o=function(o){var a=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];a.rel="stylesheet",a.href=e[o&&n?0:o?1:2],a.media="only x",r.parentNode.insertBefore(a,r),setTimeout(function(){a.media="all"})},a=new t.Image;a.onerror=function(){o(!1)},a.onload=function(){o(1===a.width&&1===a.height)},a.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon([impath + "icons.data.svg.css", impath + "icons.data.png.css", impath + "icons.fallback.css"]);
})();

(function($) {
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {

console.log('Jquery running');

  }
};
})(jQuery);