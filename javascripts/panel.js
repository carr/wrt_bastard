function Panel() {
  this.type = Display.isTouch() ? 'touch' : 'keypad'
  this.screenStack = []
  this.currentScreen = null
}

Panel.prototype.back = function() {
  if (this.screenStack.length > 0) {
    this.currentScreen.unload()
    var screen = this.currentScreen = this.screenStack.pop()

    if (this.screenStack.length == 0 && this.type == 'keypad') {
      window.menu.setRightSoftkeyLabel('', null)
    }

    if (screen.isBlocking) {
      Dialog.showLoading()
    }

    this.reloadScreen(function() {
      if (screen.isBlocking) {
        Dialog.hide()
      }
    })
  } else {
    if (this.type == 'keypad') {
      window.menu.setRightSoftkeyLabel('', null)
    }
    Utility.log('Back called, but no screen on stack!')
  }
}

Panel.prototype.clear = function() {
  this.screenStack = null
  this.currentScreen = null
}

Panel.prototype.draw = function(callback) {
  var that = this

  T.loadTemplate('layout', function(data) {
    $('#layout').html(data)
    $('body').addClass(that.type)

    if (that.type == 'keypad') {
      window.menu.setRightSoftkeyLabel('', null)
    }

    that.currentScreen.init(function(callback) {
      that.reloadScreen(callback)
    })
  })
}

Panel.prototype.getContentSize = function() {
  var height = Display.getWidgetSize().height
  if (this.currentScreen.showHeader) {
    height -= $('#header').height()
  }

  return {
    width : $('body').width(),
    height : height
  }
}

Panel.prototype.reloadScreen = function(callback) {
  this.currentScreen.show(function(data) {
    $('#content').html(data)

    callback()
  })
}

Panel.prototype.setScreen = function(screen, keepPrevious) {
  if (this.currentScreen) {
    this.currentScreen.unload()
  }

  if (keepPrevious) {
    this.screenStack.push(this.currentScreen)
    if (this.type == 'keypad') {
      var that = this
      window.menu.setRightSoftkeyLabel(i18n.Back, function() {
        that.back()
      })
    }
  }

  this.currentScreen = screen
}
