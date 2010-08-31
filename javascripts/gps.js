var Gps = {
  so : null,

  timeouts : [ 15000000, 60000000, 150000000 ],

  timeout : 0,

  init : function() {
    try {
      Gps.so = device.getServiceObject('Service.Location', 'ILocation')
    } catch (e) {
      Gps.so = null
    }
  },

  getLocation : function(callback) {
    try {
      Gps.so.ILocation.GetLocation( {
        'LocationInformationClass' : 'BasicLocationInformation',
        'Updateoptions' : {
          'UpdateTimeOut' : Gps.timeouts[Gps.timeout],
          'PartialUpdates' : false
        }
      }, function(transId, eventCode, result) {
        if (eventCode == 4) {
          if (++Gps.timeout >= Gps.timeouts.length) {
            callback( {
              'error' : 'Timeout'
            })
            Gps.timeout = 0
          } else {
            Gps.getLocation(callback)
          }
        } else {
          callback( {
            'data' : result.ReturnValue
          })
        }
      })
    } catch (e) {
//      Utility.log('Gps.getLocation exception e:' + e)
    }
  }
}
