function TabbedPane() {
  this.type = Display.isTouch() ? 'touch' : 'keypad'
  this.tabs = []
  this.screenStack = []
  this.currentScreen = null
}

TabbedPane.prototype.add = function(screen) {
  var id = this.tabs.push(new screen(this))
  return this.tabs[id - 1]
}

TabbedPane.prototype.draw = function(callback) {
  var that = this

  T.loadTemplate('layout_' + this.type, function(data) {
    $('#layout')[0].innerHTML = data
    $('body').addClass(that.type)

    if (Display.isTouch()) {
      that.drawTouch()
    } else {
      that.drawKeypad()
      that.clickTab(0)
    }

    callback()
  })
}

TabbedPane.prototype.drawTouch = function() {
  var that = this

  T.renderCollectionIn($('#tab_row'), 'tabs', this.tabs, function() {
    for ( var i in that.tabs) {
      that.tabs[i].clickItem = $($('.tab')[i])
      
      that.tabs[i].clickItem.click(function(num) {
        return function() {
          that.clickTab(num)
        }
      }(i))
    }

    $('.tabs td').width(100 / that.tabs.length + '%')
    that.clickTab(0)
  })

  if (window.widget) {
    window.menu.hideSoftkeys()
  }
}

TabbedPane.prototype.drawKeypad = function() {
  this.setKeypadMenu()
}

TabbedPane.prototype.setKeypadMenu = function() {
  var that = this
  if (window.widget) {
    widget.setNavigationEnabled(false)
    window.menu.setRightSoftkeyLabel('', null)
    window.menu.showSoftkeys()
    window.menu.clear()
    for ( var i in that.tabs) {
      uiManager.addMenuItem(that.tabs[i].title, parseInt(i), function(id) {
        return function() {
          that.clickTab(id)
        }
      }(i))
    }
  }
}

TabbedPane.prototype.clickTab = function(id) {
  var screen = this.tabs[id]
  var that = this

  screen.init(function(callback) {
    that.click(screen, callback)

    $('.tabs .current').removeClass('current')
    $(screen.clickItem).addClass('current')
    $(screen.clickItem).blur()
  })
}

TabbedPane.prototype.click = function(screen, callback) {
  this.setScreen(screen, false)
  this.reloadScreen(callback)
}

TabbedPane.prototype.clear = function() {
  this.tabs = null
  this.screenStack = null
  this.currentScreen = null
}

TabbedPane.prototype.setScreen = function(screen, keepPrevious) {
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

TabbedPane.prototype.reloadScreen = function(callback) {
  this.currentScreen.show(function(data) {
    $('#content')[0].innerHTML = data

    callback()
  })
}

TabbedPane.prototype.back = function() {
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

TabbedPane.prototype.getContentSize = function() {
  var height = Display.getWidgetSize().height - $('#footer').height()
  if (this.currentScreen.showHeader) {
    height -= $('#header').height()
  }

  return {
    width : $('body').width(),
    height : height
  }
}