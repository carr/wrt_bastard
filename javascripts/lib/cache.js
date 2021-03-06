var Cache = {
  persistent : false,

  nonPersistent : {},

  init : function(config) {
    if (config.persistent) {
      Cache.persistent = config.persistent
    }
  },

  get : function(key, options) {
    var data

    if (options && options.persistent || Cache.persistent) {
      data = window.widget.preferenceForKey(key)
    } else {
      data = Cache.nonPersistent[key]
    }

    if (typeof (data) != 'undefined' && data != 'null') {
      data = Utility.parseJSON(data)

      if (options && options.timeout && (new Date()).getTime() > data.time + options.timeout) {
        Cache.clear(key)
        return null
      } else {
        return data.value
      }
    } else {
      return null
    }
  },

  set : function(key, data, options) {
    var object = JSON.stringify({
      time : (new Date()).getTime(),
      value : data
    })

    if (options && options.persistent || Cache.persistent) {
      window.widget.setPreferenceForKey(object, key)
    } else {
      Cache.nonPersistent[key] = object
    }
  },

  clear : function(key) {
    if (typeof (key) == 'string') {
      delete Cache.nonPersistent[key]
      window.widget.setPreferenceForKey(null, key)
    } else {
      for ( var i = 0; i < key.length; i++) {
        delete Cache.nonPersistent[key[i]]
        window.widget.setPreferenceForKey(null, key[i])
      }
    }
  }
}
