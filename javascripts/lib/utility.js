var Utility = {
  // sets the base font size so everything else defined in 'em' units can be scaled
  setCssBodyFontSize : function(size) {
    document.body.style.fontSize = "" + size + "px"
  },

  // converts all <a href="www.url.com">bla</a> links contained in element to window.open so it doesn't break the WRT app
  convertLinksToExternal : function(element) {
    element.select('a').each(function(link) {
      var url = link.getAttribute('href')
      link.set( {
        'href' : 'javascript:;'
      })
      var eventType = Display.isTouch() ? 'tap' : 'keydown'
      var fn = function(event) {
        console.info(event)
        Utility.openURL(url)
      }
      if (Display.isTouch()) {
        fn = function(event) {
          console.info(event)
          if (event.keyCode == 0 || event.keyCode == 13) {
            Utility.openURL(url)
          }
        }
      }

      link.on(eventType, fn, link, {
        stopPropagation : true
      })
    })
  },

  truncate : function(text, options) {
    if (options == undefined) {
      options = {}
    }
    if (!options.length) {
      options.length = 30
    }
    if (!options.omission) {
      options.omission = '...'
    }

    if (text.length > options.length) {
      text = text.substring(0, options.length)
      text = text.replace(/\w+$/, '')
      text += options.omission
    }
    return text
  },

  showSlide : function(element) {
    // tu me jebalo nesto, element je ostajao nevidljiv pa je maknuto
  if (Device.getBrowserVersion() != 413 && !Display.isTouch()) {
    openItem.slideToggle()
  } else {
    //element.style.display = 'block'
    element.style.display = 'table-row'
  }
},

  show : function(element) {
  Utility.log('The show function is deprecated')
  },
  
  hide : function(element) {
  Utility.log('The hide function is deprecated')
  },

// binds a "click" or "fire/enter" event so it works on keypad and touch phones
  bindClick : function(selector, callback) {
    Utility.log('The bindClick function is deprecated')
  },

  //escapes HTML/XML tags so they can be displayed in a web page
  /*escapeHTML : function escapeHTML(str) {
  	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  },*/

  // dumps an object for easy inspection
  inspect : function(obj, maxLevels, level) {
    var str = '', type, msg;

    // Start Input Validations
  // Don't touch, we start iterating at level zero
  if (level == null)
    level = 0;

  // At least you want to show the first level
  if (maxLevels == null)
    maxLevels = 1;
  if (maxLevels < 1)
    return '<font color="red">Error: Levels number must be > 0</font>';

  // We start with a non null object
  if (obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
  // End Input Validations

  // Each Iteration must be indented
  str += '<ul>';

  // Start iterations for all objects in obj
  for (property in obj) {
    try {
      // Show "property" and "type property"
      type = typeof (obj[property]);
      str += '<li>(' + type + ') ' + property + ((obj[property] == null) ? (': <b>null</b>') : ('')) + '</li>';

      // We keep iterating if this property is an Object, non null
      // and we are inside the required number of levels
      if ((type == 'object') && (obj[property] != null) && (level + 1 < maxLevels))
        str += inspect(obj[property], maxLevels, level + 1);
    } catch (err) {
      // Is there some properties in obj we can't access? Print it red.
      if (typeof (err) == 'string')
        msg = err;
      else if (err.message)
        msg = err.message;
      else if (err.description)
        msg = err.description;
      else
        msg = 'Unknown';

      str += '<li><font color="red">(Error) ' + property + ': ' + msg + '</font></li>';
    }
  }

  // Close indent
  str += '</ul>';

  return str;
},

//Opens a URL.
  openURL : function(url) {
    if (Device.isEmulator()) {
      // outside WRT
      window.open(url, "NewWindow")
    } else {
      // in WRT
      widget.openURL(url)
    }
  },

  parseJSON : function(text) {
    if (Device.getBrowserVersion() == 413) {
      return eval("(" + text + ")")
    } else {
      return JSON.parse(text)
    }
  },

  isEmpty : function(object) {
    for ( var i in object) {
      if (object.hasOwnProperty(i)) {
        return false
      }
    }

    return true
  },

  count : function(object) {
    var count = 0
    for ( var property in object) {
      if (object.hasOwnProperty(property)) {
        count++
      }
    }

    return count
  },
  
  focus : function(id) {
    document.getElementById(id).focus()
  },
  
  lipsum : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur dictum eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius lorem a nisi pharetra in aliquet leo pharetra. Nam orci odio, aliquam aliquet dignissim id, vulputate in metus. Sed in mauris in dui suscipit hendrerit sed sed tellus. Morbi ullamcorper sapien eget nunc varius feugiat. Pellentesque fringilla auctor felis, sed sagittis nulla aliquam in. Suspendisse urna sapien, aliquet non auctor a, scelerisque eu neque. Maecenas molestie tincidunt ornare. Ut condimentum suscipit fringilla. Vivamus at turpis et odio sollicitudin pretium. Vestibulum auctor metus vitae lacus imperdiet tincidunt ornare nec ligula.'
}
