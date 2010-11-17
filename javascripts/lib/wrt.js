var Wrt = {}

Wrt.setup = function() {
  initExtensions()
  
  if (window.widget) {
    window.menu.hideSoftkeys()

    if (Display.isTouch()) {
      Utility.setCssBodyFontSize(22)
    }

    if (!Display.isTouch()) {
      window.widget.setNavigationEnabled(false)
    }
  }
}

Wrt.scrollTo = function(value) {
  document.body.scrollTop = value
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