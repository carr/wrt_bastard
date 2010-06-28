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
function includeJavaScript(src) {
    document.write("<script type=\"text/javascript\" src=\"wrt_bastard/javascripts/" + src + ".js\"></script>");
}

// include a stylesheet
function includeStylesheet(src) {
    document.write("<style type=\"text/css\"> @import url(\"wrt_bastard/stylesheets/" +  src + ".css\"); </style>");
}

// include all JavaScripts
includeJavaScript('commands');
includeJavaScript('device');
includeJavaScript('rss');
includeJavaScript('screen');
includeJavaScript('templating');
includeJavaScript('ui');
includeJavaScript('utility');
includeStylesheet('wrt_bastard');

// include styles
includeStylesheet('tabs');
includeStylesheet('dialog');