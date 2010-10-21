/**
 * A list of elements where only one can be current (focused) at a given time,
 * and when it's current it is in the "expanded" state
 */

extend(ExpandableList, List)

function ExpandableList(options) {
  if (typeof (options) != 'undefined') {
    if (!options.element) {
      throw "No element specified for list"
    }
    this.element = options.element

    this.expanders = this.element.find('.expander')
    this.expandeds = this.element.find('.expanded')

    this.parent.constructor.call(this, options)

    this.autoClose = options.autoClose ? options.autoClose : true
    this.autoScroll = options.autoScroll ? options.autoScroll : true
  }
}

ExpandableList.prototype.applyCurrent = function(index) {
  this.element.removeClass('current')
  this.current = $(this.element[index])
  this.current.addClass('current')
  if (this.autoClose) {
    this.expandeds.hide()
  }
  $(this.expandeds[index]).show()
  
  if (this.autoScroll) {
    document.body.scrollTop = this.current.offset().top
  }
}
