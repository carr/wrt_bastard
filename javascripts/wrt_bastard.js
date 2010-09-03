// define selector with sizzle if not defined in browser
if (typeof (document.querySelectorAll) == 'undefined') {
  document.querySelectorAll = Element.prototype.querySelectorAll = function(selectors) {
    return Sizzle(selectors, this)
  }
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

// include all JavaScripts
includeJavaScript('js_ext-touch-debug')
includeJavaScript('device')
includeJavaScript('utility')
includeJavaScript('sizzle')
includeJavaScript('js_ext_templates')
includeJavaScript('js_ext_extensions')
includeJavaScript('cache')
includeJavaScript('dialog')
includeJavaScript('dialog_box')
includeJavaScript('display')
includeJavaScript('gps')
includeJavaScript('input')
includeJavaScript('json2')
includeJavaScript('router')
includeJavaScript('rss')
includeJavaScript('soap')
includeJavaScript('toast')

// dependency resolution idea, do not delete
/*for(var i=0; i<toLoad.javascripts.length; i++){
  includeJavaScript(toLoad.javascripts[i].filename, toLoad.javascripts[i].path)
}*/

// include styles
includeStylesheet('css_ext-touch')
includeStylesheet('dialog')
includeStylesheet('dialog_box')
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
