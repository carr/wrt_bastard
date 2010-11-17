var Toast = {
  DEFAULT_DURATION : 2000,

  MIN_DURATION : 800,

  stack : [],

  current : null,

  show : function(text, duration) {
    if (typeof (duration) == 'undefined') {
      duration = Toast.DEFAULT_DURATION
    }

    if (duration < Toast.MIN_DURATION) {
      duration = Toast.MIN_DURATION
    }

    Toast.stack.push( {
      text : text,
      duration : duration
    })

    if (Toast.current == null) {
      Toast.play()
    }
  },

  play : function() {
    Toast.current = Toast.stack.shift()

    $('#toast_content').html(Toast.current.text)
    if (Device.getBrowserVersion() == 413) {
      $('#toast').show()
    } else {
      $('#toast').fadeIn('slow')
    }

    setTimeout("Toast.stop()", Toast.current.duration)
  },

  stop : function() {
    Toast.current = null

    if (Device.getBrowserVersion() == 413) {
      $('#toast').hide()
    } else {
      $('#toast').fadeOut('slow')
    }

    if (Toast.stack.length > 0) {
      Toast.play()
    }
  }
}