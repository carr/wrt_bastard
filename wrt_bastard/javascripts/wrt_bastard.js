// jquery ajax wrapper for wrt
jQuery.oldAjax = jQuery.ajax
jQuery.ajax = function(){
  try { netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead'); } catch (e) {}
  $.oldAjax.apply($, arguments);
};

document.write('<script type="text/javascript" src="javascript/wrt_bastard/commands.js"></script>')
document.write('<script type="text/javascript" src="javascript/wrt_bastard/device.js"></script>')
document.write('<script type="text/javascript" src="javascript/wrt_bastard/rss.js"></script>')
document.write('<script type="text/javascript" src="javascript/wrt_bastard/screen.js"></script>')
document.write('<script type="text/javascript" src="javascript/wrt_bastard/templating.js"></script>')
document.write('<script type="text/javascript" src="javascript/wrt_bastard/ui.js"></script>')
document.write('<script type="text/javascript" src="javascript/wrt_bastard/utility.js"></script>')
