// jquery ajax wrapper for wrt
jQuery.oldAjax = jQuery.ajax;
jQuery.ajax = function() {
  try {
    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
  } catch (e) {
  }
  $.oldAjax.apply($, arguments);
};

// include a script file
function includeJavaScript(src, path) {
  path = path || 'wrt_bastard/javascripts/';
  document.write("<script type=\"text/javascript\" src=\"" + path + src + ".js\"></script>");
}

// include a stylesheet
function includeStylesheet(src, path) {
  path = path || 'wrt_bastard/stylesheets/';
  document.write("<style type=\"text/css\"> @import url(\"" + path + src + ".css\"); </style>");
}

// extend class
function extend(extended, superclass) {
  extended.prototype = new superclass();
  extended.prototype.constructor = extended;
}

// include all JavaScripts
includeJavaScript('commands');
includeJavaScript('device');
includeJavaScript('display');
includeJavaScript('i18n');
includeJavaScript('rss');
includeJavaScript('screen');
includeJavaScript('tabbed_pane');
includeJavaScript('templating');
includeJavaScript('ui');
includeJavaScript('utility');

// include styles
includeStylesheet('wrt_bastard');
includeStylesheet('tabs');
includeStylesheet('dialog');