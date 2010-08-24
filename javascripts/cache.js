var Cache = {
  persistent : false,

  nonPersistent : {},

  init : function(config) {
    if (config.persistent) {
      Cache.persistent = config.persistent
    }
  },

  get : function(key, callback, options) {
    var data

    if (options.persistent || Cache.persistent) {
      data = window.widget.preferenceForKey(key)
    } else {
      data = Cache.nonPersistent[key]
    }

    if (typeof (data) != 'undefined') {
      data = Utility.parseJSON(data)

      if (options.timeout && (new Date()).getTime() > data.time + options.timeout) {
        Cache.retrieve(key, callback, options)
      } else {
        callback(data.value)
      }
    } else {
      Cache.retrieve(key, callback, options)
    }
  },

  retrieve : function(key, callback, options) {
    $.get(key, function(data) {
      Cache.set(key, data, options)
      callback(data)
    })
  },

  set : function(key, data, options) {
    var object = JSON.stringify( {
      time : (new Date()).getTime(),
      value : data
    })

    if (options.persistent || Cache.persistent) {
      window.widget.setPreferenceForKey(object, key)
    } else {
      Cache.nonPersistent[key] = object
    }
  },

  clear : function(key) {
    delete Cache.nonPersistent[key]
    window.widget.setPreferenceForKey(null, key)
  }
}
