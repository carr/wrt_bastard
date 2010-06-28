// jquery ajax wrapper for wrt
jQuery.oldAjax = jQuery.ajax;
jQuery.ajax = function() {
	try {
		netscape.security.PrivilegeManager
				.enablePrivilege('UniversalBrowserRead');
	} catch (e) {
	}
	$.oldAjax.apply($, arguments);
};

document.write('<script type="text/javascript" src="wrt_bastard/javascripts/commands.js"></script>');
document.write('<script type="text/javascript" src="wrt_bastard/javascripts/device.js"></script>');
document.write('<script type="text/javascript" src="wrt_bastard/javascripts/rss.js"></script>');
document.write('<script type="text/javascript" src="wrt_bastard/javascripts/screen.js"></script>');
document.write('<script type="text/javascript" src="wrt_bastard/javascripts/templating.js"></script>');
document.write('<script type="text/javascript" src="wrt_bastard/javascripts/ui.js"></script>');
document.write('<script type="text/javascript" src="wrt_bastard/javascripts/utility.js"></script>');
