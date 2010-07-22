var Toast = {
  DEFAULT_DURATION : 2000,

  MIN_DURATION : 800,

  stack : [],

  current : null,

  show : function(text, duration) {
    if (typeof (duration) == 'undefined') {
      duration = this.DEFAULT_DURATION
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
    $('#toast').fadeIn('slow')

    setTimeout("Toast.stop()", Toast.current.duration)
  },

  stop : function() {
    Toast.current = null

    $('#toast').fadeOut('slow')

    if (Toast.stack.length > 0) {
      Toast.play()
    }
  }
}