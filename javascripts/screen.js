// Screen is a superclass for various screens.
function Screen(parent) {
  this.DEFAULT_TEMPLATE = 'screen'
  this.title = 'Screen'
  this.parent = parent
  this.data = []
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
    this.resetHeaderButton()
    $('#header_text').innerHTML = this.title
    Utility.show($('#header')[0])
  } else {
    Utility.hide($('#header')[0])
  }
  this.render(callback)
}

Screen.prototype.render = function(callback) {
  load_template(this.DEFAULT_TEMPLATE, callback)
}

Screen.prototype.resetHeaderButton = function() {
  this.setHeaderButton('i.png', function() {
    Utility.log('About screen')
  })
}

Screen.prototype.setHeaderButton = function(image, callback) {
  $('.header_button').unbind('click')
  $('.header_button').click(callback)
  $('.header_button img').attr('src', 'images/' + image);
}

Screen.prototype.unload = function() {
}
