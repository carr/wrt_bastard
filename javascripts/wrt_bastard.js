// define selector with sizzle if not defined in browser
if (typeof (document.querySelectorAll) == 'undefined') {
  document.querySelectorAll = Element.prototype.querySelectorAll = function(selectors) {
    return Sizzle(selectors, this)
  }
}
// include a script file
function includeJavaScript(src, path) {
  document.write("<script type=\"text/javascript\" src=\"" + path + src + ".js\"></script>")
}
// include a stylesheet
function includeStylesheet(src, path) {
  document.write("<style type=\"text/css\"> @import url(\"" + path + src + ".css\"); </style>")
}

function includeBastardJavaScript(src) {
  includeJavaScript(src, 'wrt_bastard/javascripts/')
}

function includeBastardStylesheet(src) {
  includeStylesheet(src, 'wrt_bastard/stylesheets/')
}

includeBastardJavaScript('sizzle')
includeBastardJavaScript('js_ext-touch-debug')
includeBastardJavaScript('js_ext_templates')
includeBastardJavaScript('js_ext_extensions')

var Wrt = {}

Wrt.setup = function() {
  //Tpl.loadAll(function(){
  Wrt.initTemplates()

  if (window.widget) {
    window.menu.hideSoftkeys()
    if (!Device.isEmulator()) {
      Utility.setCssBodyFontSize(22)
    }

    if (!Display.isTouch()) {
      window.widget.setNavigationEnabled(false)
    }
  }
  //})
}

Wrt.initTemplates = function() {
  initExtensions()
}

Wrt.log = function(message) {
  // TODO: do logging in html
  if (Device.isEmulator()) {
    console.log(message)
  } else {
    alert(message)
  }
}

Wrt.exit = function() {
  window.close()
}

Wrt.lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur dictum eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius lorem a nisi pharetra in aliquet leo pharetra. Nam orci odio, aliquam aliquet dignissim id, vulputate in metus. Sed in mauris in dui suscipit hendrerit sed sed tellus. Morbi ullamcorper sapien eget nunc varius feugiat. Pellentesque fringilla auctor felis, sed sagittis nulla aliquam in. Suspendisse urna sapien, aliquet non auctor a, scelerisque eu neque. Maecenas molestie tincidunt ornare. Ut condimentum suscipit fringilla. Vivamus at turpis et odio sollicitudin pretium. Vestibulum auctor metus vitae lacus imperdiet tincidunt ornare nec ligula.'

includeBastardJavaScript('cache')
includeBastardJavaScript('device')
includeBastardJavaScript('dialog')
includeBastardJavaScript('dialog_box')
includeBastardJavaScript('display')
includeBastardJavaScript('gps')
includeBastardJavaScript('input')
includeBastardJavaScript('json2')
includeBastardJavaScript('router')
includeBastardJavaScript('rss')
includeBastardJavaScript('soap')
includeBastardJavaScript('toast')
includeBastardJavaScript('utility')

// dependency resolution idea, do not delete
/*for(var i=0; i<toLoad.javascripts.length; i++){
  includeJavaScript(toLoad.javascripts[i].filename, toLoad.javascripts[i].path)
}*/

// include styles
//includeBastardStylesheet('css_ext-touch')
includeBastardStylesheet('dialog')
includeBastardStylesheet('dialog_box')
includeBastardStylesheet('tabs')
includeBastardStylesheet('toast')
includeBastardStylesheet('wrt_bastard')

if (ENV != undefined && ENV == 'production') {
  includeStylesheet('bundle', 'app/stylesheets/')
  includeJavaScript('bundle', 'app/javascripts/')
} else {
  for ( var i in config.stylesheets) {
    path = config.stylesheets[i].path || 'app/stylesheets/'
    includeStylesheet(config.stylesheets[i].filename, path)
  }

  for ( var i in config.javascripts) {
    path = config.javascripts[i].path || 'app/javascripts/'
    includeJavaScript(config.javascripts[i].filename, path)
  }
}
