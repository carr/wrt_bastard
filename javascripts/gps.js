var Gps = {
  so : null,

  timeouts : [ 15000000, 60000000, 300000000 ],

  timeout : 0,

  position : {
    latitude : null,
    longitude : null
  },

  init : function() {
    try {
      this.so = device.getServiceObject('Service.Location', 'ILocation')
    } catch (e) {
      this.so = null
    }
  },

  getLocation : function(callback) {
    var that = this

    try {
      this.so.ILocation.GetLocation( {
        'LocationInformationClass' : 'BasicLocationInformation',
        'Updateoptions' : {
          'UpdateTimeOut' : this.timeouts[this.timeout]
        },
        'PartialUpdates' : false
      }, function(transId, eventCode, result) {
        if (eventCode == 4) {
          if (++that.timeout >= that.timeouts.length) {
            callback( {
              'error' : 'Timeout'
            })
            that.timeout = 0
          } else {
            that.getLocation(callback)
          }
        } else {
          callback( {
            'data' : result.ReturnValue
          })
        }
      })
    } catch (e) {
      //Utility.log('GetLocation e: ' + e)
    }
  }
}
