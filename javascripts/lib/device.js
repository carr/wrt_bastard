var Device = {
  browserVersion : null,

  isEmulator : function() {
    return navigator.userAgent.indexOf('SymbianOS') == -1 && navigator.userAgent.indexOf('Symbian') == -1
  },

  user_agents : [ [ 'NokiaN95_8GB', 'N95' ] ],

  getModel : function() {
  },

  getVersion : function() {
    var version = null

    var str = "SymbianOS/9.2; Series60/3.1 NokiaN95_8GB"
    str = navigator.userAgent
    var regexp = /Series[\d]{2}\/([\d]{1})\.([\d]{1})/

    var result = regexp.exec(str)
    if (result) {
      version = new DeviceVersion(result[1], result[2])
    }

    return version
  },

  getBrowserVersion : function() {
    if (this.browserVersion == null) {
      var str = navigator.userAgent
      var regexp = /AppleWebKit\/([\d]+)/

      var result = regexp.exec(str)
      if (result) {
        this.browserVersion = parseInt(result[1])
      }
    }

    return this.browserVersion
  },

  supportsHomeScreen : function() {
    return this.getModel == 'N97'
  },

  hasGps : function() {
    Gps.init()
    return Gps.so != null
  }
}

function DeviceVersion(major, minor) {
  this.major = parseInt(major)
  this.minor = parseInt(minor)
}

DeviceVersion.prototype.toString = function() {
  return "" + this.major + "." + this.minor
}
