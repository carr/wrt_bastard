function ScrollPane(container, scrollable, width, height) {
  this.container = container
  this.type = Display.isTouch() ? 'touch' : 'keypad'
  this.scrollable = {
    element : scrollable,
    width : width,
    height : height
  }
}

ScrollPane.prototype.render = function(callback) {
  that = this
  size = this.container.getContentSize()

  load_template('scroll_pane', function(data) {
    callback(data)
    $('#scroller').width(size.width)
    $('#scroller').height(size.height)
    
    load_template(that.scrollable.element, function(data) {
      $('#scroll_link')[0].innerHTML = data

      if (Display.isTouch()) {
        $('#scroll_link').click(function(event) {
          that.zoom(event);
        })
      } else {
        $('#scroller').keypress(function(event) {
          that.processKeyPressed(event);
        })
      }
    })
  })
}

ScrollPane.prototype.zoom = function(event) {
  scrollable = $('#scrollable')
  scroller = $('#scroller')
  scrollbar_left = scroller.scrollLeft()
  scrollbar_top = scroller.scrollTop()
  scroller_width = scroller.innerWidth()
  scroller_height = scroller.innerHeight()

  if (Display.isTouch()) {
    if (scrollable.width() == this.scrollable.width) {
      scrollable.width(this.scrollable.width / 2)
      scroller.scrollLeft((scrollbar_left + event.pageX - scroller_width) / 2)
    } else {
      scrollable.width(this.scrollable.width)
      scroller.scrollLeft((scrollbar_left + event.pageX) * 2 - scroller_width / 2)
    }
    if (scrollable.height() == this.scrollable.height) {
      scrollable.height(this.scrollable.height / 2)
      scroller.scrollTop((scrollbar_top + event.pageY - scroller_height) / 2)
    } else {
      scrollable.height(this.scrollable.height)
      scroller.scrollTop((scrollbar_top + event.pageY) * 2 - scroller_height / 2)
    }
  } else {
    if (scrollable.width() == this.scrollable.width) {
      scrollable.width(this.scrollable.width / 2)
      scroller.scrollLeft(scrollbar_left / 2 - scroller_width / 4)
    } else {
      scrollable.width(this.scrollable.width)
      scroller.scrollLeft(scrollbar_left * 2 + scroller_width / 2)
    }
    if (scrollable.height() == this.scrollable.height) {
      scrollable.height(this.scrollable.height / 2)
      scroller.scrollTop(scrollbar_top / 2 - scroller_height / 4)
    } else {
      scrollable.height(this.scrollable.height)
      scroller.scrollTop(scrollbar_top * 2 + scroller_height / 2)
    }
  }
}

ScrollPane.prototype.processKeyPressed = function(event) {
  scroller = $('#scroller')
  scrollbar_left = scroller.scrollLeft()
  scrollbar_top = scroller.scrollTop()

  switch (parseInt(event.keyCode)) {
    case Input.KEY_LEFT:
      scroller.scrollLeft(scrollbar_left - 30)
      break
    case Input.KEY_UP:
      scroller.scrollTop(scrollbar_top - 30)
      break
    case Input.KEY_RIGHT:
      scroller.scrollLeft(scrollbar_left + 30)
      break
    case Input.KEY_DOWN:
      scroller.scrollTop(scrollbar_top + 30)
      break
    case Input.KEY_FIRE:
      this.zoom(event)
      break
    default:
      return
  }
}
