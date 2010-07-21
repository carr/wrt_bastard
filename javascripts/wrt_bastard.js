// jquery ajax wrapper for wrt
jQuery.oldAjax = jQuery.ajax
jQuery.ajax = function() {
  try {
    netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead')
  } catch (e) {
  }
  $.oldAjax.apply($, arguments)
}

// jquery plugin for plain html that works on s60 browsers
jQuery.fn.extend({  
    html: function(value) {
        if (value == undefined) {  
            return (this[0] ? this[0].innerHTML : null);  
        }  
        else if(this[0]) {  
            try {  
                this[0].innerHTML = value;  
            } catch(e) {}  
            return this;  
        }  
    }  
});

// overriding of show method for s60 browsers that doesn't crash
jQuery.show = function(element){
	element.css({display: 'none'})
}

//overriding of show method for s60 browsers that doesn't crash
jQuery.hide = function(element){
	element.css({display: 'block'})
}

// include a script file
function includeJavaScript(src, path) {
  path = path || 'wrt_bastard/javascripts/'
  document.write("<script type=\"text/javascript\" src=\"" + path + src + ".js\"></script>")
}

// include a stylesheet
function includeStylesheet(src, path) {
  path = path || 'wrt_bastard/stylesheets/'
  document.write("<style type=\"text/css\"> @import url(\"" + path + src + ".css\"); </style>")
}

// extend class
function extend(extended, superclass) {
  extended.prototype = new superclass()
  extended.prototype.constructor = extended
}

function count(object) {
  var count = 0
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      count++
    }
  }

  return count
}

// include all JavaScripts
includeJavaScript('commands')
includeJavaScript('device')
includeJavaScript('dialog')
includeJavaScript('display')
includeJavaScript('gps')
includeJavaScript('i18n')
includeJavaScript('input')
includeJavaScript('json2')
includeJavaScript('router')
includeJavaScript('rss')
includeJavaScript('screen')
includeJavaScript('scroll_pane')
includeJavaScript('tabbed_pane')
includeJavaScript('template')
includeJavaScript('toast')
includeJavaScript('ui_manager')
includeJavaScript('utility')

// include styles
includeStylesheet('dialog')
includeStylesheet('tabs')
includeStylesheet('toast')
includeStylesheet('wrt_bastard')