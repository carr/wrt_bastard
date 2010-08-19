/**
 * A list of elements where only one can be current (focused) at a given time
 */

function List(options) {
  if (typeof (options) != 'undefined') {
    var that = this

    if (!options.element) {
      throw "No element specified for list"
    }

    if (!options.data) {
      throw "No data specified for list"
    }

    this.element = options.element
    this.items = this.element.find('.item_link')
    this.data = options.data

    this.setCurrent(options.current ? options.current : 0)
    this.clickCallback = options.onClick

    this.items.bindClick(function(element) {
      for ( var i = 0; i < that.items.length; i++) {
        if (that.items[i] == element) {
          that.applyCurrent(i);
          if (that.clickCallback) {
            that.clickCallback($(element))
          }
          break
        }
      }

    })
  }
}

List.prototype.setCurrent = function(item) {
  if (typeof (item) == 'number') {
    if (item >= 0 && item < this.element.length) {
      this.applyCurrent(item)
    } else {
      throw "Unknown item number: " + item
    }
  } else {
    if (this.data[0][item.key]) {
      var counter = 0
      for ( var i in this.data) {
        if (this.data[i][item.key] == item.value) {
          this.applyCurrent(counter)
          break
        }
        counter++
      }
    } else {
      throw "Unknown key: " + item.key
    }
  }
}

List.prototype.applyCurrent = function(index) {
  this.element.removeClass('current')
  this.current = $(this.element[index])
  this.current.addClass('current')
}
