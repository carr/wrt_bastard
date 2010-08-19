function Panel() {
  this.type = Display.isTouch() ? 'touch' : 'keypad'
  this.screenStack = []
  this.currentScreen = null
  this.menuItems = []
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
  this.menuItems = null
}

Panel.prototype.draw = function(callback) {
  var that = this

  T.loadTemplate('layout', function(data) {
    $('#layout').html(data)
    $('body').addClass(that.type)

    if (that.type == 'keypad') {
      $('.touch').remove()
      that.drawKeypadMenu()
    }

    that.clickMenuItem(0)
    callback()
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

Panel.prototype.loadScreen = function(screen, callback) {
  this.setScreen(screen, false)
  this.reloadScreen(callback)
}

Panel.prototype.addMenuItem = function(screen) {
  var id = this.menuItems.push(new screen(this))
  return this.menuItems[id - 1]
}

Panel.prototype.drawKeypadMenu = function() {
  var that = this

  if (window.widget) {
    widget.setNavigationEnabled(false)
    window.menu.setRightSoftkeyLabel('', null)
    window.menu.showSoftkeys()
    window.menu.clear()
    for ( var i in this.menuItems) {
      uiManager.addMenuItem(this.menuItems[i].title, parseInt(i), function(id) {
        return function() {
          that.clickMenuItem(id)
        }
      }(i))
    }
  }
}

Panel.prototype.clickMenuItem = function(id) {
  var screen = this.menuItems[id]
  var that = this
  this.screenStack = []
  this.currentScreen = null

  if (this.type == 'keypad') {
    window.menu.setRightSoftkeyLabel('', null)
  }

  screen.init(function(callback) {
    that.menuItemOnInit(screen, callback)
  })
}

Panel.prototype.menuItemOnInit = function(screen, callback) {
  this.loadScreen(screen, callback)
}
