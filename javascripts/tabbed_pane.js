extend(TabbedPane, Panel)

function TabbedPane() {
  this.tabs = []
  this.parent.constructor.call(this)
}

TabbedPane.prototype.add = function(screen) {
  var id = this.tabs.push(new screen(this))
  return this.tabs[id - 1]
}

TabbedPane.prototype.clear = function() {
  this.tabs = null
  this.parent.clear.call(this)
}

TabbedPane.prototype.click = function(screen, callback) {
  this.setScreen(screen, false)
  this.reloadScreen(callback)
}

TabbedPane.prototype.clickTab = function(id) {
  var screen = this.tabs[id]
  var that = this
  this.screenStack = []
  this.currentScreen = null

  if (this.type == 'keypad') {
    window.menu.setRightSoftkeyLabel('', null)
  }

  screen.init(function(callback) {
    that.click(screen, callback)

    $('.tabs .current').removeClass('current')
    $(screen.clickItem).addClass('current')
    $(screen.clickItem).blur()
  })
}

TabbedPane.prototype.draw = function(callback) {
  var that = this

  T.loadTemplate('layout_' + this.type, function(data) {
    $('#layout').html(data)
    $('body').addClass(that.type)

    if (Display.isTouch()) {
      that.drawTouch()
    } else {
      that.drawKeypad()
    }

    callback()
  })
}

TabbedPane.prototype.drawKeypad = function() {
  this.setKeypadMenu()
  this.clickTab(0)
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

    $('.tabs td').width(Display.getWidgetSize().width / that.tabs.length + 'px')
    that.clickTab(0)
  })

  if (window.widget) {
    window.menu.hideSoftkeys()
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
