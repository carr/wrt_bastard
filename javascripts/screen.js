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

Screen.prototype.init = function(callback) {
  var that = this

  if (this.isBlocking) {
    Dialog.showLoading()
  }

  this.loadData(function() {
    callback(function() {
    })
  })
}

Screen.prototype.loadData = function(callback) {
  callback()
}

Screen.prototype.show = function(callback) {
  window.scrollTo(0, 0)
  if (this.showHeader) {
    if (this.parent.type == 'touch') {
      this.resetHeaderButton()
    }
    $('#header_text').html(this.title)
    $('#header').show()
  } else {
    $('#header').hide()
  }
  var that = this
  setTimeout(function() {
    that.render(function(data) {
      callback(data)
    })
  }, 50)
}

Screen.prototype.render = function(callback) {
  T.loadTemplate(this.DEFAULT_TEMPLATE, callback)
  Dialog.hide()
}

Screen.prototype.resetHeaderButton = function() {
}

Screen.prototype.setHeaderButton = function(image, callback) {
  $('.header_button').unbind('click')
  $('.header_button').click(callback)
  $('.header_button img').attr('src', 'images/' + image)
}

Screen.prototype.unload = function() {
}
