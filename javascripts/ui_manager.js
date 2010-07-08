// uiManager manages displayables.
var uiManager = {
  displayable : null,

  init : function() {
    this.displayable = null
    Input.setKeys()
  },

  getCurrent : function() {
    return this.displayable
  },

  setCurrent : function(displayable) {
    if (this.displayable !== null) {
      this.displayable.clear()
    }
    this.displayable = displayable
  },

  draw : function(callback) {
    this.displayable.draw(callback)
  },

  addMenuItem : function(title, id, callback) {
    var command = new MenuItem(title, id)
    command.onSelect = function(id) {
      // workaround for stupid X6 phone that doesn't get UTF
      Dialog.showLoading(i18n.loading)
      callback(id)
    }
    window.menu.append(command)
  }
}