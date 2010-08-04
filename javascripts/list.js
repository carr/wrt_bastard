/**
 * A list of elements where only one can be current (focused) at a given time
 */

function List(options) {
  if (typeof (options) != 'undefined') {
    var that = this

    if (!options.element) {
      throw "No element specified for list"
    }

    this.element = options.element
    this.items = this.element.find('a')

    this.current = $(this.items[0])
    this.clickCallback = options.onClick

    this.items.bindClick(function(element) {
      that.items.removeClass('current')
      $(element).addClass('current')
      if (that.clickCallback) {
        that.clickCallback($(element))
      }
    })

    this.current.addClass('current')
  }
}

List.prototype.setCurrent = function(item) {
  // TODO
}
