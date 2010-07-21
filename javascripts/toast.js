var Toast = {
  DEFAULT_DURATION : 2000,

  stack : [],

  current : null,

  show : function(text, duration) {
    if (typeof (duration) == 'undefined') {
      duration = this.DEFAULT_DURATION
    }
    this.stack.push( {
      text : text,
      duration : duration
    })

    if (this.current == null) {
      this.play()
    }
  },

  play : function() {
    this.current = this.stack.shift()

    $('#toast_content')[0].innerHTML = this.current.text
    Utility.show($('#toast')[0])

    setTimeout("Toast.stop()", this.current.duration)
  },

  stop : function() {
    this.current = null
    
    $('#toast').hide()

    if (this.stack.length > 0) {
      this.play()
    }
  }
}