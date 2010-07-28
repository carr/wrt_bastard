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
jQuery.fn.extend( {
  html : function(value) {
    if (value == undefined) {
      return (this[0] ? this[0].innerHTML : null)
    } else if (this[0]) {
      try {
        for ( var i = 0; i < this.length; i++) {
          this[i].innerHTML = value
        }
      } catch (e) {
      }
      return this
    }
  },

  appendHTML : function(value) {
    if (value == undefined) {
      return null
    } else if (this[0]) {
      for ( var i = 0; i < this.length; i++) {
        this[i].innerHTML += value
      }

      return this
    }
  },

  show : function() {
    this.css('display', 'block')
  },

  hide : function() {
    this.css('display', 'none')
  },

  bindClick : function(callback) {
    if (Display.isTouch()) {
      this.bind("mousedown", function(event) {
        callback(this)
      })
    } else {
      this.bind("keydown", function(event) {
        if (event.keyCode == 0 || event.keyCode == 13) {
          callback(this)
          event.stopPropagation()
        }
      })
    }
  }
})

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
  for ( var property in object) {
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
includeJavaScript('list')
includeJavaScript('router')
includeJavaScript('rss')
includeJavaScript('screen')
includeJavaScript('scroll_pane')
includeJavaScript('soap')
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

if (ENV != undefined && ENV == 'production') {
  includeStylesheet('bundle', 'app/stylesheets/')
  includeJavaScript('bundle', 'app/javascripts/')
} else {
  for ( var i in config.stylesheets) {
    includeStylesheet(config.stylesheets[i].filename, config.stylesheets[i].path)
  }

  for ( var i in config.javascripts) {
    includeJavaScript(config.javascripts[i].filename, config.javascripts[i].path)
  }
}
