// include a script file
function includeJavaScript(src, path) {
  document.write("<script type=\"text/javascript\" src=\"" + path + src + ".js\"></script>")
}
// include a stylesheet
function includeStylesheet(src, path) {
  document.write("<style type=\"text/css\"> @import url(\"" + path + src + ".css\"); </style>")
}
function includeBastardJavaScript(src) {
  includeJavaScript(src, 'wrt_bastard/javascripts/lib/')
}

function includeBastardStylesheet(src) {
  includeStylesheet(src, 'wrt_bastard/stylesheets/')
}

// include styles
//includeBastardStylesheet('css_ext-touch')
includeBastardStylesheet('dialog')
includeBastardStylesheet('dialog_box')
includeBastardStylesheet('toast')
includeBastardStylesheet('wrt_bastard')

if (ENV != undefined && ENV == 'production') {
  includeStylesheet('bundle', 'app/stylesheets/')
  includeJavaScript('bundle', 'app/javascripts/')
} else {
  // join core wrt bastard files and user defined
  var wrtBastard = wrtBastardCore.concat(config.wrt_bastard)

  for( var i=0; i<wrtBastard.length; i++ ){
    includeBastardJavaScript(wrtBastard[i])
  }
    
  for ( var i in config.stylesheets) {
    path = config.stylesheets[i].path || 'app/stylesheets/'
    includeStylesheet(config.stylesheets[i].filename, path)
  }

  for ( var i in config.javascripts) {
    path = config.javascripts[i].path || 'app/javascripts/'
    includeJavaScript(config.javascripts[i].filename, path)
  }
}
