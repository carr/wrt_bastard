extend(TabbedPane, Panel)

function TabbedPane() {
  this.parent.constructor.call(this)
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
  this.drawKeypadMenu()
  this.clickMenuItem(0)
}

TabbedPane.prototype.drawTouch = function() {
  var that = this

  T.renderCollectionIn($('#tab_row'), 'tabs', this.menuItems, function() {
    for ( var i in that.menuItems) {
      that.menuItems[i].clickItem = $($('.tab')[i])

      that.menuItems[i].clickItem.click(function(num) {
        return function() {
          that.clickMenuItem(num)
        }
      }(i))
    }

    $('.tabs td').width(Display.getWidgetSize().width / that.menuItems.length + 'px')
    that.clickMenuItem(0)
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

TabbedPane.prototype.menuItemOnInit = function(screen, callback) {
  this.loadScreen(screen, callback)

  $('.tabs .current').removeClass('current')
  $(screen.clickItem).addClass('current')
  $(screen.clickItem).blur()
}
