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
      this.so = device.getServiceObject('Service.Location', 'ILocation');
    } catch (e) {
      this.so = null
//      Utility.log(e)
    }
  },

  getLocation : function(callback) {
    Utility.log('entered get location')
    var that = this

    try {
      this.so.ILocation.GetLocation( {
        'LocationInformationClass' : 'BasicLocationInformation',
        'Updateoptions' : {
          'UpdateTimeOut' : this.timeouts[this.timeout]
        },
        'PartialUpdates' : false
      }, function(transId, eventCode, result) {
        Utility.log('entering callback')
        if (eventCode == 4) {
          Utility.log('event 4')
          if (++that.timeout >= that.timeouts.length) {
            Utility.log('callback timeout')
            callback( {
              'error' : 'Timeout'
            })
          } else {
            Utility.log('new get location')
            that.getLocation(callback)
          }
        } else {
          Utility.log('return data')
          callback( {
            'data' : result.ReturnValue
          })
        }
      })
    } catch (e) {
      Utility.log('GetLocation e: ' + e)
    }
  }
}
