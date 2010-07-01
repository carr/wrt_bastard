// Screen is a superclass for various screens.
function Screen(parent) {
  this.DEFAULT_TEMPLATE = 'screen'
  this.title = 'Screen'
  this.parent = parent
  this.data = {}
  this.isBlocking = true
  this.showHeader = true
  this.clickItem = null
  this.unloadItems = {}
}

Screen.prototype.init = function() {
  var that = this

  if (this.isBlocking) {
    Dialog.show('Loading')
  }

  this.loadData(function() {
    if (that.isBlocking) {
      Dialog.hide('Loading')
    }
  })
}

Screen.prototype.loadData = function(callback) {
  callback()
}

Screen.prototype.show = function(callback) {
  if (this.showHeader) {
    $('#header_text').html(this.title)
    $('#header').show()
  } else {
    $('#header').hide()
  }
  this.render(callback)

}

Screen.prototype.render = function(callback) {
  load_template(this.DEFAULT_TEMPLATE, callback)
}

Screen.prototype.unload = function() {
}
